import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { Observable } from 'rxjs';
import { CoursesService } from '../service/courses.service';
import { map } from 'rxjs/internal/operators/map';
import { LoadingService } from '../loading/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private CoursesService: CoursesService,
    private LoadingService: LoadingService
  ) {}

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {
    const course$ = this.CoursesService.loadAllCourses().pipe(
      map((courses) => courses.sort(sortCoursesBySeqNo))
    );

    const loadCourse$ = this.LoadingService.showLoaderUntilCompleted(course$);

    this.beginnerCourses$ = loadCourse$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == 'BEGINNER')
      )
    );

    this.advancedCourses$ = loadCourse$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == 'ADVANCED')
      )
    );
  }
}
