import 'package:flutter/material.dart';
import 'package:salem_app/core/Constants.dart';

class VerificationPage extends StatelessWidget {
  const VerificationPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        iconTheme: IconThemeData(color: kPrimaryColor),
        centerTitle: true,
        title: const Text(
          'Verification',
          style: TextStyle(color: kPrimaryColor, fontWeight: FontWeight.w700),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        child: Column(
          children: [
            const Spacer(flex: 1),
            Container(
              width: 90,
              height: 90,
              decoration: BoxDecoration(
                color: Colors.grey.shade100,
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.lock_outline,
                size: 40,
                color: Colors.teal,
              ),
            ),

            const SizedBox(height: 24),

            const Text(
              'ادخل رمز التحقق',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: kPrimaryColor,
              ),
            ),

            const SizedBox(height: 8),

            const Text(
              'لقد قمنا بإرسال رمز التأكيد للبريد الإلكتروني التالي',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 14, color: kPrimaryColor),
            ),

            const SizedBox(height: 4),

            const Text(
              'ahmedazy.nuxui@gmail.com',
              style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
            ),

            const SizedBox(height: 32),

            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: List.generate(4, (index) {
                return Container(
                  width: 60,
                  height: 50,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    border: Border.all(
                      color: index < 3 ? Colors.teal : Colors.grey.shade300,
                    ),
                    borderRadius: BorderRadius.circular(25),
                  ),
                  child: Text(
                    index == 0
                        ? '5'
                        : index == 1
                        ? '9'
                        : index == 2
                        ? '2'
                        : '',
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                );
              }),
            ),

            const SizedBox(height: 16),

            const Text(
              '00:59',
              style: TextStyle(
                color: Color.fromARGB(255, 168, 26, 16),
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 8),

            GestureDetector(
              onTap: () {},
              child: const Text(
                'لم تستلم رمزاً؟ طلب رمز جديد',
                style: TextStyle(
                  color: Color.fromARGB(255, 168, 26, 16),
                  fontSize: 13,
                ),
              ),
            ),

            const SizedBox(height: 24),

            GestureDetector(
              onTap: () {},
              child: Container(
                width: double.infinity,
                height: 55,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [Color(0xFF00BE9B), Color(0xFF1B4374)],
                  ),
                  borderRadius: BorderRadius.circular(30),
                ),
                alignment: Alignment.center,
                child: const Text(
                  ' تحقق ',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ),
            ),

            const Spacer(flex: 1),

            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: EdgeInsets.all(10),
                  height: 45,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(22),
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [Color(0xFF00BE9B), Color(0xFF1B4374)],
                    ),
                  ),
                  child: Center(
                    child: Text(
                      '!تسجيل الدخول',
                      style: TextStyle(color: Colors.white, fontSize: 16),
                    ),
                  ),
                ),
                TextButton(
                  onPressed: () {},
                  child: const Text(
                    'تذكرت كلمة المرور؟',
                    style: TextStyle(color: kPrimaryColor),
                  ),
                ),
              ],
            ),

            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }
}
