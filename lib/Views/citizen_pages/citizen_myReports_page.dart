import 'package:flutter/material.dart';
import 'package:salem_app/data/models/report_model.dart';
import 'package:salem_app/data/report_Repository.dart';
import 'package:salem_app/widgets/common_widgets/reports_list.dart';
import 'package:salem_app/widgets/common_widgets/section_title.dart';
import 'package:salem_app/widgets/citizen_role_widgets/myReports_page_wigets/Add_reportButton.dart';
import 'package:salem_app/widgets/citizen_role_widgets/myReports_page_wigets/Load_more_section.dart';
import 'package:salem_app/widgets/citizen_role_widgets/myReports_page_wigets/custom_appBar.dart';

class CitizenMyReportsPage extends StatefulWidget {
  const CitizenMyReportsPage({super.key});

  @override
  State<CitizenMyReportsPage> createState() => _CitizenMyReportsPageState();
}

class _CitizenMyReportsPageState extends State<CitizenMyReportsPage> {
  final ReportRepository reportRepository = ReportRepository();

  final int pageSize = 5;
  int currentPage = 1;

  List<ReportModel> reportsToShow = [];

  @override
  void initState() {
    super.initState();
    loadMore();
  }

  void loadMore() {
    final allReports = reportRepository.getAllReports();
    final newReports =
        allReports.skip((currentPage - 1) * pageSize).take(pageSize).toList();

    setState(() {
      reportsToShow.addAll(newReports);
      currentPage++;
    });
  }

  @override
  Widget build(BuildContext context) {
    final totalReports = reportRepository.getAllReports().length;

    return SafeArea(
      child: Scaffold(
        body: Column(
          children: [
            const CustomAppBar(title: 'My Reports'),
            const SizedBox(height: 10),
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: SectionTitle(title: 'All Reports', color: Colors.black),
            ),
            const SizedBox(height: 10),
            Expanded(child: ReportsList(reports: reportsToShow)),
            LoadMoreSection(
              currentCount: reportsToShow.length,
              totalCount: totalReports,
              onLoadMore: loadMore,
            ),
            const SizedBox(height: 10),
            const AddReportButton(),
            const SizedBox(height: 10),
          ],
        ),
      ),
    );
  }
}
