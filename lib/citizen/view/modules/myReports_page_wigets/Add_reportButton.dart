import 'package:flutter/material.dart';
import 'package:salem_app/citizen/view/create_new_report_page.dart';

class AddReportButton extends StatelessWidget {
  const AddReportButton({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: GestureDetector(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const CreateNewReportPage(),
            ),
          );
        },
        child: Container(
          height: 40, 
          width: 120, 
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              colors: [Color(0xFF00BE9B), Color(0xFF1B4374)],
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
            ),
            borderRadius: BorderRadius.circular(20), 
          ),
          alignment: Alignment.center,
          child: const Text(
            'Add Report +',
            style: TextStyle(
              fontSize: 14,        
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
        ),
      ),
    );
  }
}
