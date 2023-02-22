import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  constructor(private memberservice:MembersService) { }

  ngOnInit(): void {
    this.loadMembers()
  }

  members:Member[] = [];

  loadMembers(){
    this.memberservice.getMembers().subscribe({
      next: members => this.members = members
    })
  }

}
