
import 'package:flutter/material.dart';

class SubmitResolutionButton extends StatelessWidget {
  const SubmitResolutionButton({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10), // padding داخلي ديناميكي
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [Color(0xFF00BE9B), Color(0xFF1B4374)],
        ),
        borderRadius: BorderRadius.circular(20),
      ),
      child: const Center(
        child: Text(
          'Submit Resolution',
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

