import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  getAllEmployees() {
    return this.apollo.watchQuery({
      query: gql`
        query {
          getAllEmployees {
            _id
            first_name
            last_name
            email
            designation
            department
          }
        }
      `,
      fetchPolicy: 'network-only',
    }).valueChanges;
  }

  deleteEmployee(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          deleteEmployeeById(eid: "${id}")
        }
      `,
    });
  }

  getEmployeeById(id: string) {
    return this.apollo.query({
      query: gql`
        query {
          searchEmployeeById(eid: "${id}") {
            _id
            first_name
            last_name
            email
            designation
            department
            salary
          }
        }
      `
    });
  }

  // ✅ FIXED this method — removed comma, added semicolon
  searchEmployees(department: string, designation: string) {
    return this.apollo.query({
      query: gql`
        query ($department: String, $designation: String) {
          searchEmployeeByDesignationOrDepartment(department: $department, designation: $designation) {
            _id
            first_name
            last_name
            email
            department
            designation
          }
        }
      `,
      variables: {
        department,
        designation
      }
    });
  }

  addEmployee(data: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          addEmployee(
            first_name: "${data.first_name}",
            last_name: "${data.last_name}",
            email: "${data.email}",
            gender: "${data.gender}",
            designation: "${data.designation}",
            salary: ${data.salary},
            date_of_joining: "${data.date_of_joining}",
            department: "${data.department}",
            employee_photo: "${data.employee_photo}"
          ) {
            _id
          }
        }
      `
    });
  }

  updateEmployee(id: string, data: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          updateEmployeeById(
            eid: "${id}",
            first_name: "${data.first_name}",
            last_name: "${data.last_name}",
            designation: "${data.designation}",
            salary: ${data.salary},
            department: "${data.department}"
          ) {
            _id
          }
        }
      `
    });
  }
}
