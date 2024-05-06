import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../Interfaces.interface';
import { HeaderComponent } from '../header/header.component';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { MatHeaderCellDef, MatColumnDef, MatHeaderCell, MatCell, MatCellDef, MatHeaderRowDef, MatRowDef, MatHeaderRow, MatRow } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  standalone: true,
  imports: [
    HeaderComponent,
    HttpClientModule,
    MatTable,
    MatHeaderCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderRow,
    MatRow,
    MatCheckbox
  ]
})
export class SettingsComponent implements OnInit {

  users: UserProfile[] = [];
  dataSource = new MatTableDataSource<UserProfile>(this.users); // Changed to MatTableDataSource
  displayedColumns: string[] = ['email', 'phone_number', 'first_name', 'last_name', 'level', 'select'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<UserProfile[]>('http://127.0.0.1:8000/get_all_users')
      .subscribe({
        next: (data: UserProfile[]) => {
          this.users = data.map(user => ({ ...user, selected: false }));
          this.dataSource.data = this.users; // Update dataSource
        },
        error: (error: any) => {
          console.error('Error fetching users:', error);
        }
      });
  }

  toggleSelection(user: UserProfile) {
    user.selected = !user.selected;
    console.log(user.selected);
  }

  removeUser() {
    const selectedUsers = this.users.filter(user => user.selected);
    selectedUsers.forEach(user => {
      // Call API to remove user
      this.http.post(`http://127.0.0.1:8000/remove_user/`, { email: user.email })
        .subscribe({
          next: () => {
            // Remove the user from the local list
            this.users = this.users.filter(u => u !== user);
            this.dataSource.data = this.users; // Update dataSource
          },
          error: (error) => {
            console.error('Error removing user:', error);
          }
        });
    });
  }

  promoteUser() {
    const selectedUsers = this.users.filter(user => user.selected);
    selectedUsers.forEach(user => {
      // Call API to promote user
      this.http.post(`http://127.0.0.1:8000/promote_user/`, { email: user.email })
        .subscribe({
          next: () => {
            // Update the user's level in the local list
            user.level = 'admin';
            this.dataSource.data = this.users; // Update dataSource
          },
          error: (error) => {
            console.error('Error promoting user:', error);
          }
        });
    });
  }

  demoteUser() {
    const selectedUsers = this.users.filter(user => user.selected);
    selectedUsers.forEach(user => {
      // Call API to demote user
      this.http.post(`http://127.0.0.1:8000/demote_user/`, { email: user.email })
        .subscribe({
          next: () => {
            // Update the user's level in the local list
            user.level = 'worker';
            this.dataSource.data = this.users; // Update dataSource
          },
          error: (error) => {
            console.error('Error demoting user:', error);
          }
        });
    });
  }


}
