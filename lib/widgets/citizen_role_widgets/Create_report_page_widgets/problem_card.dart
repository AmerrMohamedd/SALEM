import 'package:flutter/material.dart';

class ProblemCard extends StatelessWidget {
  const ProblemCard({
    super.key,
    required this.text,
    required this.image,
    required this.isSelected,
    required this.onTap,
  });

  final String text;
  final String image;
  final bool isSelected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.only(left: 4),
        child: Container(
          height: 105,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(24),
            gradient: const LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [Color(0xFF00BE9B), Color(0xFF1B4374)],
            ),
            border: isSelected
                ? Border.all(color: Colors.blueAccent, width: 3)
                : null,
            boxShadow: isSelected
                ? [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.4),
                      blurRadius: 8,
                      offset: const Offset(0, 4),
                    )
                  ]
                : [],
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset(image, height: 50, width: 50),
              const SizedBox(height: 5),
              Text(
                text,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                  color: Colors.white,
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
