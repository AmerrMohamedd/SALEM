import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_svg/svg.dart';
import 'package:salem/core/constans.dart';
import 'package:salem/view/modules/common/alpha_button.dart';
import 'package:salem/view/modules/common/main_button.dart';
import 'package:salem/view/modules/employee_widgets/task_status_steeper.dart';

class TaskProgressView extends StatelessWidget {
  const TaskProgressView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: ShaderMask(
          shaderCallback: (mainGradient_green).createShader,
          blendMode: BlendMode.srcIn,
          child: Text(
            "Task Id #12345",
            style: TextStyle(
              fontSize: 24.sp,
              fontWeight: FontWeight.w600,
              fontFamily: 'league',
            ),
          ),
        ),
        centerTitle: true,
        leading: Center(
          child: SizedBox(
            width: 16.w,
            height: 16.h,
            child: SvgPicture.asset(
              'assets/vectors/long_back_arrow.svg',

              fit: BoxFit.contain,
            ),
          ),
        ),
      ),
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 8.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              height: 60.h,
              decoration: BoxDecoration(
                gradient: mainGradient_green,
                borderRadius: BorderRadius.circular(17.r),
              ),
              child: Center(
                child: Container(
                  width: 333.06.w,
                  height: 41.91.h,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(13.r),
                    color: Colors.white,
                  ),
                  child: Padding(
                    padding: EdgeInsets.only(left: 19.48.w, top: 6.37.h),
                    child: Column(
                      children: [
                        Row(
                          children: [
                            Text(
                              'Task: ',
                              style: TextStyle(
                                fontSize: 12.sp,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                            Text(
                              'Repairing a lighting pole - Al-Thawra Street',
                              style: TextStyle(
                                fontSize: 12.sp,
                                fontWeight: FontWeight.w400,
                              ),
                            ),
                          ],
                        ),
                        Row(
                          children: [
                            Text(
                              'Step: ',
                              style: TextStyle(
                                fontSize: 12.sp,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                            Text(
                              'Step 4 of 5',
                              style: TextStyle(
                                fontSize: 12.sp,
                                fontWeight: FontWeight.w400,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
            SizedBox(height: 11.h),
            Container(
              width: 344.w,
              height: 80.h,
              decoration: BoxDecoration(
                color: Color(0xFFE0E0E0),
                borderRadius: BorderRadius.circular(8.r),
              ),
              child: Center(child: TaskStatusStepper(currentStep: 3)),
            ),
            SizedBox(height: 22.h),
            Text(
              '📝 Required Inputs:',
              style: TextStyle(fontSize: 12.sp, fontWeight: FontWeight.w700),
            ),
            SizedBox(height: 11.h),
            Center(
              child: Container(
                width: 319.w,
                height: 64.h,
                decoration: BoxDecoration(
                  color: Color(0xFFF9F8FF),
                  borderRadius: BorderRadius.circular(10.r),
                  border: Border.all(color: Color(0xFFE6E4F0), width: 1.w),
                ),
                child: Padding(
                  padding: EdgeInsets.only(top: 10.h, left: 13.w),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      ShaderMask(
                        shaderCallback: (mainGradient_green).createShader,
                        blendMode: BlendMode.srcIn,
                        child: Text(
                          "Location Confirmation: ",
                          style: TextStyle(
                            fontSize: 12.sp,
                            fontWeight: FontWeight.w400,
                            fontFamily: 'league',
                          ),
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.only(left: 53.w, top: 5.h),
                        child: Row(
                          children: [
                            AlphaButton(
                              width: 117.w,
                              height: 23.h,
                              text: 'Accept location',
                              buttonColor: 0xFF7B68EE,
                              textColor: 0xFF7B68EE,
                              fontsize: 12.sp,
                              radius: 33.r,
                            ),
                            SizedBox(width: 38.w),
                            AlphaButton(
                              width: 44.w,
                              height: 23.h,
                              text: 'Edit',
                              buttonColor: 0xFF00B884,
                              textColor: 0xFF00B884,
                              fontsize: 12.sp,
                              radius: 33.r,
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            SizedBox(height: 8.h),
            Center(
              child: Container(
                width: 319.w,
                height: 64.h,
                decoration: BoxDecoration(
                  color: Color(0xFFF9F8FF),
                  borderRadius: BorderRadius.circular(10.r),
                  border: Border.all(color: Color(0xFFE6E4F0), width: 1.w),
                ),
                child: Padding(
                  padding: EdgeInsets.only(top: 10.h, left: 13.w),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      ShaderMask(
                        shaderCallback: (mainGradient_green).createShader,
                        blendMode: BlendMode.srcIn,
                        child: Text(
                          "What was done?",
                          style: TextStyle(
                            fontSize: 12.sp,
                            fontWeight: FontWeight.w400,
                            fontFamily: 'league',
                          ),
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.only(top: 5.h),
                        child: AlphaButton(
                          width: 295.w,
                          height: 23.h,
                          text:
                              'input field(Briefly write down the actions taken...)',
                          buttonColor: 0xFF00B884,
                          textColor: 0xFF00B884,
                          fontsize: 12.sp,
                          radius: 33.r,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            SizedBox(height: 22.h),
            Text(
              'Upload After Photos:',
              style: TextStyle(fontSize: 12.sp, fontWeight: FontWeight.w700),
            ),

            Center(
              child: Container(
                width: 319.w,
                height: 97,
                decoration: BoxDecoration(
                  color: Color(0xffF9F8FF),
                  border: Border.all(color: Color(0xffE6E4F0), width: 1.w),
                ),
                child: Center(
                  child: AlphaButton(
                    width: 295.w,
                    height: 50.h,

                    text:
                        'Open Camera / Gallery (Upload photos showing the completed work)',
                    buttonColor: 0xFF00B884,
                    textColor: 0xFF00B884,
                    fontsize: 12.sp,
                    radius: 15.r,
                  ),
                ),
              ),
            ),
            SizedBox(height: 111.h),
            Row(
              children: [
                MainButton(
                  text: 'Submit Resolution',
                  ontap: () {},
                  font_family: 'league',
                  width: 159.w,
                  height: 30.h,
                  fontSize: 18.sp,
                  gradient: mainGradient_green,
                  borderRadius: 30.r,
                ),
                SizedBox(width: 32.w),
                MainButton(
                  text: 'Request Support',
                  ontap: () {},
                  font_family: 'league',
                  width: 139.42.w,
                  height: 30.h,
                  fontSize: 16.sp,
                  color: mainColor_navy,
                  borderRadius: 30.r,
                ),
              ],
            ),
            SizedBox(height: 12.h),
            Row(
              children: [
                MainButton(
                  text: 'Mark as Not Resolved',
                  ontap: () {},
                  font_family: 'league',
                  width: 178.55.w,
                  height: 30.h,
                  fontSize: 16.sp,
                  color: mainColor_navy,
                  borderRadius: 30.r,
                ),
                SizedBox(width: 12.45.w),
                MainButton(
                  text: 'Back to My Tasks',
                  ontap: () {},
                  font_family: 'league',
                  width: 141.w,
                  height: 30.h,
                  fontSize: 16.sp,
                  color: mainColor_navy,
                  borderRadius: 30.r,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
