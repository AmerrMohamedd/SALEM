import 'package:flutter/material.dart';

class TaskSection extends StatefulWidget {
  final String title;
  final Widget content;

  const TaskSection({super.key, required this.title, required this.content});

  @override
  State<TaskSection> createState() => TaskSectionState();
}

class TaskSectionState extends State<TaskSection> {
  bool isExpanded = true;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        GestureDetector(
          onTap: () {
            setState(() {
              isExpanded = !isExpanded;
            });
          },
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                widget.title,
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Icon(
                isExpanded
                    ? Icons.keyboard_arrow_up
                    : Icons.keyboard_arrow_down,
              ),
            ],
          ),
        ),

        const SizedBox(height: 8),

        AnimatedSize(
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeInOut,
          child: isExpanded ? widget.content : const SizedBox(),
        ),
      ],
    );
  }
}
