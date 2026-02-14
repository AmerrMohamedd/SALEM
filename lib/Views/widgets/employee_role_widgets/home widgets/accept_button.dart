import 'package:flutter/material.dart';
import 'package:salem_app/core/Constants.dart';
import 'package:salem_app/Views/employee_pages/task_progress_page.dart';
import 'package:salem_app/citizen/data/report_model.dart';

class AcceptButton extends StatelessWidget {
  const AcceptButton({super.key, required this.report});
 final ReportModel report ;
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) {
              return TaskProgressPage(report: report,);
            },
          ),
        );
      },
      child: Container(
        padding: EdgeInsets.all(8),
        child: Text(
          'Accept',
          style: TextStyle(color: kPrimaryColor, fontSize: 14),
        ),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
        ),
      ),
    );
  }
}
