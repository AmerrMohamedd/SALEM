import 'package:flutter/material.dart';
import 'package:salem_app/data/report_Repository.dart';
import 'package:salem_app/widgets/common_widgets/reports_list.dart';
import 'package:salem_app/widgets/common_widgets/section_title.dart';
import 'package:salem_app/widgets/citizen_role_widgets/home_widgets.dart/Create_newReport_button.dart';
import 'package:salem_app/widgets/citizen_role_widgets/home_widgets.dart/home_header_widget.dart';

class CitizenHomePage extends StatefulWidget {
  const CitizenHomePage({super.key});

  @override
  State<CitizenHomePage> createState() => _CitizenHomePageState();
}

class _CitizenHomePageState extends State<CitizenHomePage> {
  final ReportRepository reportRepository = ReportRepository();
  @override
  Widget build(BuildContext context) {
    final recentReports = reportRepository.getAllReports().take(5).toList();
    return SafeArea(
      child: Scaffold(
        body: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const HomeHeader(),
              const SizedBox(height: 15),
              const CreateNewReportButton(),
              const SizedBox(height: 20),
              const SectionTitle(
                title: 'Recent Reports : ',
                color: Colors.black,
              ),
              Expanded(child: ReportsList(reports: recentReports)),
            ],
          ),
        ),
      ),
    );
  }
}
