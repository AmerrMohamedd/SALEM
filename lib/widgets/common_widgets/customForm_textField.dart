import 'package:flutter/material.dart';
import 'package:salem_app/Constants.dart';

// ignore: must_be_immutable
class CustomFormTextfield extends StatelessWidget {
  CustomFormTextfield({this.onChanged, this.hintText , this.obscureText = false});
  String? hintText;
  Function(String)? onChanged;
  bool ? obscureText ;
  @override
  Widget build(BuildContext context) {
    return TextFormField(
      style: TextStyle(color: Colors.black),
      obscureText:obscureText !,
      onChanged: onChanged,
      // ignore: body_might_complete_normally_nullable
      validator: (data) {
        if (data!.isEmpty) {
          return 'field is required';
        }
      },
      decoration: InputDecoration(
        hintText: hintText,
        hintStyle: const TextStyle(color: kPrimaryColor),
        border:  OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide(color: kPrimaryColor),
        ),
        enabledBorder:  OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide(color: kPrimaryColor),
        ),
      ),
    );
  }
}
