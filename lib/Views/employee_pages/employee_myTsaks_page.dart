// import 'package:flutter/material.dart';
// import 'package:salem_app/data/models/report_model.dart';
// import 'package:salem_app/data/report_Repository.dart';
// import 'package:salem_app/widgets/citizen_role_widgets/myReports_page_wigets/custom_appBar.dart';
// import 'package:salem_app/widgets/employee_role_widgets/common%20widgets/task_card.dart';
// import 'package:salem_app/widgets/employee_role_widgets/common%20widgets/tasks_list.dart';
// import 'package:salem_app/widgets/employee_role_widgets/my_tasks_page_widgets/tasks_section.dart';

// class EmployeeMyTasksPage extends StatelessWidget {
//   EmployeeMyTasksPage({super.key});
//   final ReportRepository reportRepository = ReportRepository();
//   @override
//   Widget build(BuildContext context) {
//         final incomingReports = reportRepository.getAllReports().take(5).toList();

//     return Scaffold(
//       body: SingleChildScrollView(
//         padding: const EdgeInsets.all(16),
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             const CustomAppBar(title: 'My Tasks'),
//             const SizedBox(height: 10),
//             TaskSection(
//               title: 'Current Task',
//               content: TaskCard(
//                 report: ReportModel(
//                   id: 'id',
//                   type: 'type',
//                   status: 'status',
//                   createdAt: DateTime.now(),
//                   location: 'location',
//                 ),
//               ), 
//             ),
      
//             const SizedBox(height: 20),
      
//             TaskSection(
//               title: 'Upcoming Tasks',
//               content: TasksList(reports:incomingReports), 
//             ),
      
//             const SizedBox(height: 20),
      
//             TaskSection(
//               title: 'Completed Tasks',
//               content: TasksList(reports: []), 
//             ),
//           ],
//         ),
//       ),
//     );
//   }
// }

import 'package:flutter/material.dart';
import 'package:salem_app/citizen/data/report_model.dart';
import 'package:salem_app/citizen/data/services/report_Repository.dart';
import 'package:salem_app/citizen/view/modules/myReports_page_wigets/custom_appBar.dart';
import 'package:salem_app/Views/widgets/employee_role_widgets/common%20widgets/task_card.dart';
import 'package:salem_app/Views/widgets/employee_role_widgets/common%20widgets/tasks_list.dart';
import 'package:salem_app/Views/widgets/employee_role_widgets/my_tasks_page_widgets/tasks_section.dart';

class EmployeeMyTasksPage extends StatelessWidget {
  EmployeeMyTasksPage({super.key});
  final ReportRepository reportRepository = ReportRepository();

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final screenHeight = MediaQuery.of(context).size.height;

    final incomingReports = reportRepository.getAllReports().take(5).toList();

    return Scaffold(
      body: SingleChildScrollView(
        padding: EdgeInsets.all(screenWidth * 0.04), // 4% من العرض
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Flexible(
              flex: 0,
              child: const CustomAppBar(title: 'My Tasks'),
            ),
            SizedBox(height: screenHeight * 0.015), // 1.5% من الطول

            // Current Task
            TaskSection(
              title: 'Current Task',
              content: TaskCard(
                report: ReportModel(
                  id: 'id',
                  type: 'type',
                  status: 'status',
                  createdAt: DateTime.now(),
                  location: 'location',
                ),
              ),
            ),
            SizedBox(height: screenHeight * 0.025), // 2.5% من الطول

            // Upcoming Tasks
            TaskSection(
              title: 'Upcoming Tasks',
              content: TasksList(reports: incomingReports),
            ),
            SizedBox(height: screenHeight * 0.025),

            // Completed Tasks
            TaskSection(
              title: 'Completed Tasks',
              content: TasksList(reports: []),
            ),
          ],
        ),
      ),
    );
  }
}

