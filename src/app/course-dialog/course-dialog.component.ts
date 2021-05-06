import { AfterViewInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../model/course';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { CoursesService } from '../service/courses.service';
import { LoadingService } from '../loading/loading.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CoursesStore } from '../service/courses.store';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss'],
  providers: [LoadingService],
})
export class CourseDialogComponent {
  form: FormGroup;

  course: Course;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course,
    private coursesStore: CoursesStore,
    private CoursesService: CoursesService,
    private LoadingService: LoadingService
  ) {
    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required],
    });
  }

  save() {
    const changes = this.form.value;

    // this.coursesStore.saveCourse(this.course.id, changes).subscribe();
    const saveCourse$ = this.CoursesService.saveCourse(this.course.id, changes);
    this.LoadingService.showLoaderUntilCompleted(saveCourse$).subscribe(
      (val) => {
        this.dialogRef.close(val);
      }
    );
  }

  close() {
    this.dialogRef.close();
  }
}