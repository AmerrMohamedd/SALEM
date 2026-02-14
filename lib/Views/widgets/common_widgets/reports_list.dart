import 'package:flutter/material.dart';
import 'package:salem_app/citizen/data/report_model.dart';
import 'package:salem_app/citizen/view/modules/home_widgets.dart/report_card.dart';

class ReportsList extends StatelessWidget {
  final List<ReportModel> reports;

  const ReportsList({super.key, required this.reports});

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 8),
      itemCount: reports.length,
      shrinkWrap: true,
      physics: const BouncingScrollPhysics(),
      separatorBuilder: (_, __) => const SizedBox(height: 8),
      itemBuilder: (context, index) {
        return ReportCard(report: reports[index]);
      },
    );
  }
}
