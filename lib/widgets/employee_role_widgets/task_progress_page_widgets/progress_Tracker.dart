import 'package:flutter/material.dart';

// ignore: must_be_immutable
class ProgressTracker extends StatelessWidget {
  ProgressTracker({super.key});
  List<String> steps = [
    "Reported",
    "Under Review",
    "Assigned",
    "In Progress",
    "Resolved",
  ];
  int currentStep = 3;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: List.generate(steps.length, (index) {
        bool isCompleted = index <= currentStep;

        return Column(
          children: [
            // Circle with gradient check
            Container(
              width: 28,
              height: 28,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: isCompleted ? null : Colors.grey, // grey if not completed
                gradient: isCompleted
                    ? const LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [Color(0xFF00BE9B), Color(0xFF1B4374)],
                      )
                    : null,
              ),
              child: isCompleted
                  ? const Icon(Icons.check, size: 16, color: Colors.white)
                  : null,
            ),
            const SizedBox(height: 4),
            Text(
              steps[index],
              style: const TextStyle(fontSize: 10),
            ),
          ],
        );
      }),
    );
  }
}
