import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../../shared/_services/data.service';

@Component({
  selector: 'app-edit-lamppost',
  templateUrl: './edit-lamppost.component.html',
  styleUrls: ['./edit-lamppost.component.scss']
})
export class EditLamppostComponent implements OnInit {

  constructor(
    private router: Router,
    private datasev: DataService
  ) { }

  ngOnInit(): void {

  }

}
