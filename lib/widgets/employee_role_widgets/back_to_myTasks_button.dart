import 'package:flutter/material.dart';
import 'package:salem_app/Views/employee_pages/employee_myTsaks_page.dart';

class BackToMytasksButton extends StatelessWidget {
  const BackToMytasksButton({super.key});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) {
              return EmployeeMyTasksPage();
            },
          ),
        );
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        decoration: BoxDecoration(
          color: const Color(0xff0D3A4B),
          borderRadius: BorderRadius.circular(20),
        ),
        child: const Text(
          'Back To My Tasks',
          style: TextStyle(
            color: Colors.white,
            fontSize: 18,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
    );
  }
}
