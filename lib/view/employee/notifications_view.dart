import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_svg/svg.dart';
import 'package:salem/core/constans.dart';
import 'package:salem/view/modules/employee_widgets/notification_tile.dart';

class Notifications extends StatelessWidget {
  const Notifications({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          AppBar(
            title: ShaderMask(
              shaderCallback: (mainGradient_green).createShader,
              blendMode: BlendMode.srcIn,
              child: Text(
                "Notification",
                style: TextStyle(
                  fontSize: 24.sp,
                  fontWeight: FontWeight.w900,
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
                  'assets/vectors/back_arrow.svg',

                  fit: BoxFit.contain,
                ),
              ),
            ),
          ),
          SizedBox(height: 40.h),
          Padding(
            padding: EdgeInsets.only(left: 281.w),
            child: ShaderMask(
              shaderCallback: (mainGradient_green).createShader,
              blendMode: BlendMode.srcIn,
              child: Text(
                "Mark all",
                style: TextStyle(
                  fontSize: 14.sp,
                  fontWeight: FontWeight.w600,
                  fontFamily: 'league',
                ),
              ),
            ),
          ),
          ...List.generate(10, (index) {
            return NotificationTile();
          }),
        ],
      ),
    );
  }
}
