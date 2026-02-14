import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:salem_app/auth/cubits/auth_cubit.dart';
import 'package:salem_app/auth/view/login_page.dart';
import 'package:salem_app/auth/view/modules/customForm_textField.dart';
import 'package:salem_app/auth/view/modules/have_or_not_anAccount.dart';
import 'package:salem_app/auth/view/modules/signUp_button.dart';

class SignupPage extends StatelessWidget {
  const SignupPage({super.key});

  @override
  Widget build(BuildContext context) {
    TextEditingController nameController = TextEditingController();
    TextEditingController emailController = TextEditingController();
    TextEditingController passwordController = TextEditingController();
    TextEditingController mobileNumController = TextEditingController();
    TextEditingController nationalIdController = TextEditingController();
    TextEditingController dobController = TextEditingController();
    return Scaffold(
      appBar: AppBar(
        iconTheme: IconThemeData(color: Color(0xff1B4374)),
        centerTitle: true,
        title: Text(
          'New Account',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.w700,
            color: Color(0xff1B4374),
          ),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: SingleChildScrollView(
          child: BlocListener<AuthCubit, AuthState>(
            listener: (context, state) {
              if (state is AuthInitial) {
                context.read<AuthCubit>().setUserType_citizen();
                Navigator.pushNamedAndRemoveUntil(
                  context,
                  'login',
                  (route) => false,
                );
              } else if (state is AuthError) {
                ScaffoldMessenger.of(
                  context,
                ).showSnackBar(SnackBar(content: Text(state.message)));
              }
            },
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,

              children: [
                const SizedBox(height: 20),
                CustomFormTextfield(
                  type: 'text',
                  hintText: 'Username',
                  controller: nameController,
                ),
                const SizedBox(height: 20),
                CustomFormTextfield(
                  type: 'email',
                  hintText: 'Email',
                  controller: emailController,
                ),

                const SizedBox(height: 20),
                CustomFormTextfield(
                  type: 'password',
                  hintText: 'Password',
                  obscureText: true,
                  controller: passwordController,
                ),
                const SizedBox(height: 20),
                CustomFormTextfield(
                  type: 'phone',
                  hintText: 'National ID',
                  controller: nationalIdController,
                ),
                const SizedBox(height: 20),
                CustomFormTextfield(
                  type: 'phone',
                  hintText: 'Mobile number',
                  controller: mobileNumController,
                ),
                const SizedBox(height: 20),
                CustomFormTextfield(
                  type: 'date',
                  hintText: 'Date of birth',
                  controller: dobController,
                ),
                const SizedBox(height: 60),
                BlocBuilder<AuthCubit, AuthState>(
                  builder: (context, state) {
                    if (state is AuthLoading) {
                      return CircularProgressIndicator();
                    }
                    return GestureDetector(
                      child: SignupButton(width: 200),
                      onTap: () {
                        context.read<AuthCubit>().signup({
                          'username': nameController.text,
                          'email': emailController.text,
                          'password': passwordController.text,
                          'phone_number': mobileNumController.text,
                          'national_id': nationalIdController.text,
                          'birth_date': dobController.text,
                          'user_type': 'citizen',
                        });
                      },
                    );
                  },
                ),
                const SizedBox(height: 20),
                HaveOrNotAnaccount(
                  promptText: 'already have an account',
                  actionText: 'Log In',
                  onActionTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) {
                          return LoginPage();
                        },
                      ),
                    );
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
