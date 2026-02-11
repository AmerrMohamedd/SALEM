import 'package:flutter/material.dart';
import 'package:salem_app/Constants.dart';
import 'package:salem_app/data/models/report_model.dart';
import 'package:salem_app/Views/widgets/employee_role_widgets/task%20details%20page%20widgets/task_info_card.dart';

class TaskDetailsPage extends StatelessWidget {
    final ReportModel report;

  const TaskDetailsPage({super.key, required this.report});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Task Details',
          style: TextStyle(fontWeight: FontWeight.bold, color: kPrimaryColor),
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TaskInfoCard(report: report),
            const SizedBox(height: 15),
            GestureDetector(
              onTap: () {
                showDialog(
                  context: context,
                  builder:
                      (_) => Dialog(
                        insetPadding: const EdgeInsets.all(12),
                        backgroundColor: Colors.transparent,
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(16),
                          child: Image.asset(
                            'assets/images/WhatsApp Image 2025-12-13 at 18.34.47_9e2734c6.jpg',
                            fit: BoxFit.contain,
                          ),
                        ),
                      ),
                );
              },
              child: ClipRRect(
                borderRadius: BorderRadius.circular(16),
                child: Image.asset(
                  'assets/images/WhatsApp Image 2025-12-13 at 18.34.47_9e2734c6.jpg',
                  width: double.infinity,
                  height: 180,
                  fit: BoxFit.cover,
                ),
              ),
            ),

            const SizedBox(height: 16),

            const Text(
              "Description:",
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 20,
                color: Colors.black,
              ),
            ),
            Text(
              report.description ?? '',
              style: const TextStyle(fontSize: 16),
            ),
            const SizedBox(height: 12),
          ],
        ),
      ),
    );
  }

}