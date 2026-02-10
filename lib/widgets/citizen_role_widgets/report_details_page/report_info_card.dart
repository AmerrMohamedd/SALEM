import 'package:flutter/material.dart';
import 'package:salem_app/data/models/report_model.dart';

class ReportInfoCard extends StatelessWidget {
  final ReportModel report;

  const ReportInfoCard({super.key, required this.report});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8),
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFF00BE9B), Color(0xFF1B4374)],
          ),
          borderRadius: BorderRadius.circular(24),
        ),
        child: Container(
          padding: EdgeInsets.all(10),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(20),
            color: Colors.white,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                "Problem Type:",
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                  color: Colors.black54,
                ),
              ),
              Text(report.type, style: const TextStyle(fontSize: 16)),
              const SizedBox(height: 12),
              const Text(
                "Location:",
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                  color: Colors.black54,
                ),
              ),
              Text(report.location, style: const TextStyle(fontSize: 16)),
              const SizedBox(height: 12),

              const Text(
                "Status:",
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                  color: Colors.black54,
                ),
              ),
              Text(report.status, style: const TextStyle(fontSize: 16)),
              const SizedBox(height: 12),

              const Text(
                "Date:",
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                  color: Colors.black54,
                ),
              ),
              Text(
                report.createdAt.toString(),
                style: const TextStyle(fontSize: 16),
              ),
              const SizedBox(height: 12),
            ],
          ),
        ),
      ),
    );
  }
}
