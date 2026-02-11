import 'package:flutter/material.dart';

class RequestSupportButton extends StatelessWidget {
  const RequestSupportButton({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10), // padding داخلي ديناميكي
      decoration: BoxDecoration(
        color: Color(0xff0D3A4B),
        borderRadius: BorderRadius.circular(20),
      ),
      child: const Center(
        child: Text(
          'Request Support',
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