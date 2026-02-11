import 'package:flutter/material.dart';
import 'package:salem_app/Constants.dart';

class Section extends StatelessWidget {
  const Section({super.key, required this.icon, required this.title, this.onPressed});
  final IconData icon;
  final String title;
  final VoidCallback? onPressed;
  
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Row(
        children: [
          Container(
            height: 60,
            width: 60,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: Colors.grey.shade300,
            ),
            child: Icon(icon, size: 40, color: Colors.teal),
          ),
          const SizedBox(width: 15),
          Text(title, style: TextStyle(fontSize: 20)),
          Spacer(flex: 1),
          IconButton(
            onPressed: () {},
            icon: Icon(Icons.arrow_forward_ios, color: kPrimaryColor),
          ),
        ],
      ),
    );
  }
}
