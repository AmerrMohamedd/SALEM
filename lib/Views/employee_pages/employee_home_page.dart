// import 'package:flutter/material.dart';
// import 'package:salem_app/data/report_Repository.dart';
// import 'package:salem_app/widgets/citizen_role_widgets/home_widgets.dart/home_header_widget.dart';
// import 'package:salem_app/widgets/common_widgets/section_title.dart';
// import 'package:salem_app/widgets/employee_role_widgets/common%20widgets/tasks_list.dart';

// class EmployeeHomePage extends StatefulWidget {
//   const EmployeeHomePage({super.key});

//   @override
//   State<EmployeeHomePage> createState() => _EmployeeHomePageState();
// }

// class _EmployeeHomePageState extends State<EmployeeHomePage> {
//   final ReportRepository reportRepository = ReportRepository();

//   @override
//   Widget build(BuildContext context) {
//     final incomingReports = reportRepository.getAllReports().take(5).toList();

//     return SafeArea(
//       child: Scaffold(
//         body: Padding(
//           padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
//           child: Column(
//             crossAxisAlignment: CrossAxisAlignment.start,
//             children: [
//               const HomeHeader(),
//               const SizedBox(height: 20),
//               SectionTitle(
//                 title: 'Incoming Reports List :',
//                 color: Colors.black,
//               ),
//               const SizedBox(height: 10),

//               Expanded(child: TasksList(reports: incomingReports)),
//             ],
//           ),
//         ),
//       ),
//     );
//   }
// }

//  // Row(
//               //   mainAxisAlignment: MainAxisAlignment.center,
//               //   children: [
//               //     CompletedOrPending(
//               //       text: 'Completed',
//               //       image: 'assets/images/check-mark.png',
//               //     ),
//               //     const SizedBox(width:40 ,),
//               //     CompletedOrPending(
//               //       text: 'Pending',
//               //       image: 'assets/images/time.png',
//               //     ),
//               //   ],
//               // ),
//               // const SizedBox(height: 15,),


import 'package:flutter/material.dart';
import 'package:salem_app/data/report_Repository.dart';
import 'package:salem_app/Views/widgets/citizen_role_widgets/home_widgets.dart/home_header_widget.dart';
import 'package:salem_app/Views/widgets/common_widgets/section_title.dart';
import 'package:salem_app/Views/widgets/employee_role_widgets/common%20widgets/tasks_list.dart';

class EmployeeHomePage extends StatefulWidget {
  const EmployeeHomePage({super.key});

  @override
  State<EmployeeHomePage> createState() => _EmployeeHomePageState();
}

class _EmployeeHomePageState extends State<EmployeeHomePage> {
  final ReportRepository reportRepository = ReportRepository();

  @override
  Widget build(BuildContext context) {
    // أبعاد الشاشة
    final screenWidth = MediaQuery.of(context).size.width;
    final screenHeight = MediaQuery.of(context).size.height;

    // جلب أول 5 تقارير
    final incomingReports = reportRepository.getAllReports().take(5).toList();

    return SafeArea(
      child: Scaffold(
        body: Padding(
          padding: EdgeInsets.symmetric(
            horizontal: screenWidth * 0.04, // 4% من العرض
            vertical: screenHeight * 0.01,  // 1% من الطول
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              const HomeHeader(),

              SizedBox(height: screenHeight * 0.02),

              // Section Title
              SectionTitle(
                title: 'Incoming Reports List :',
                color: Colors.black,
              ),

              SizedBox(height: screenHeight * 0.01),

              // Tasks List (تمتد لأقصى مساحة متاحة)
              Expanded(
                flex: 5,
                child: TasksList(reports: incomingReports),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

