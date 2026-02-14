import 'package:flutter/material.dart';
import 'package:salem_app/core/Constants.dart';
import 'package:salem_app/auth/view/modules/customForm_textField.dart';

class CitizenForgetpasswordPage extends StatelessWidget {
  const CitizenForgetpasswordPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        iconTheme: IconThemeData(color: kPrimaryColor),
        centerTitle: true,
        title: Text(
          'Forget Password',
          style: TextStyle(color: kPrimaryColor, fontWeight: FontWeight.w700),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
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
              '!استعادة كلمة المرور',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: kPrimaryColor,
              ),
            ),

            const SizedBox(height: 8),

            const Text(
              '!قم بإدخال البريد الإلكتروني لاستعادة كلمة المرور الخاصة بك',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 14,
                color: Color.fromARGB(255, 168, 26, 16),
              ),
            ),

            const SizedBox(height: 32),

            CustomFormTextfield(
              type: 'email',
              hintText: 'البريد الالكتروني'),

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
                  'إرسال رمز التحقق',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ),
            ),

            const Spacer(),

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
