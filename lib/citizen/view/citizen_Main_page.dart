import 'package:flutter/material.dart';
import 'package:salem_app/citizen/view/citizen_myReports_page.dart';
import 'package:salem_app/citizen/view/citizen_home_page.dart';
import 'package:salem_app/citizen/view/citizen_myProfile_page.dart';
import 'package:salem_app/citizen/view/modules/home_widgets.dart/Custom_Bottom_Navigation_Bar.dart';

class CitizenMainPage extends StatefulWidget {
  const CitizenMainPage({super.key});

  @override
  State<CitizenMainPage> createState() => _CitizenMainPageState();
}

class _CitizenMainPageState extends State<CitizenMainPage> {
  int currentIndex = 0;

  final pages = const [
    CitizenHomePage(),
    CitizenMyReportsPage(),
    CitizenMyprofilePage(),
  ];

  void onNavTap(int index) {
    setState(() {
      currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: currentIndex,    
        children: pages,      
      ),
      bottomNavigationBar: CustomBottomNavigationBar(
        currentIndex: currentIndex,
        onTap: onNavTap,
      ),
    );
  }
}
