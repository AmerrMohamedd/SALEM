import 'package:flutter/material.dart';
import 'package:salem_app/Constants.dart';

class LogoWidget extends StatelessWidget {
  const LogoWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [ 
        FractionallySizedBox(
                widthFactor: 0.9,
                child: Image.asset(
                  'assets/images/c31e5c669917344b36fc6ce45785796258468701.png',
                ),
              ),
              SizedBox(height: 30),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Text(
                  "System for Accident Limitations & Emergency Management",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: kPrimaryColor,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
      ],
    );
  }
}
