import 'package:flutter/material.dart';
import 'package:salem_app/data/dummy_reports.dart';
import 'package:salem_app/widgets/common_widgets/reports_list.dart';
import 'package:salem_app/widgets/common_widgets/section_title.dart';
import 'package:salem_app/widgets/home_widgets.dart/Bottom_Navigation_Bar.dart';
import 'package:salem_app/widgets/home_widgets.dart/Create_newReport_button.dart';
import 'package:salem_app/widgets/home_widgets.dart/home_header_widget.dart';

class CitizenHomePage extends StatelessWidget {
  const CitizenHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    // هنا بناخد أول 5 عناصر بس
    final recentReports = dummyReports.take(5).toList();

    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const HomeHeader(),
          const SizedBox(height: 40),
          CreateNewReportButton(),
          const SizedBox(height: 30,),
          SectionTitle(title: 'Recent Reports : '),
          ReportsList(reports: recentReports),
        ],
      ),
      bottomNavigationBar: customBottomNavigationBar(),
    );
  }
}
