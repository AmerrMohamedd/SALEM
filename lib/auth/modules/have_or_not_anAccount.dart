import 'package:flutter/material.dart';

class HaveOrNotAnaccount extends StatelessWidget {
  const HaveOrNotAnaccount({super.key, required this.promptText, required this.actionText, required this.onActionTap});
  final String promptText;   
  final String actionText; 
  final VoidCallback onActionTap;
  
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(promptText, style: TextStyle(fontSize: 14)),
        GestureDetector(
          onTap:onActionTap,
          child: Text(
            actionText,
            style: TextStyle(fontSize: 14, color: Color(0xff00BE9B)),
          ),
        ),
      ],
    );
  }
}
