import 'package:flutter/material.dart';
import 'package:salem_app/data/models/report_model.dart';
import 'package:salem_app/widgets/home_widgets.dart/report_card.dart';

class ReportsList extends StatelessWidget {
  final List<ReportModel> reports;

  const ReportsList({super.key, required this.reports});

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      padding: EdgeInsets.symmetric(horizontal: 4,vertical: 8),
      itemCount: reports.length,
      shrinkWrap: true,
      physics: NeverScrollableScrollPhysics(), // لأن الصفحة نفسها فيها Scroll
      separatorBuilder: (_, __) => SizedBox(height: 8),
      itemBuilder: (context, index) {
        return ReportCard(report: reports[index]);
      },
    );
  }
}
