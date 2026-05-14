import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_svg/svg.dart';
import 'package:salem/core/constans.dart';

class NotificationTile extends StatelessWidget {
  const NotificationTile({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 360.w,
      padding: EdgeInsets.symmetric(vertical: 12.h), // بدل height الثابت
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start, // مهم!
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          SizedBox(width: 30.w),
          Container(
            width: 45.w,
            height: 45.h,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: mainGradient_green,
            ),
            child: Center(
              child: SvgPicture.asset('assets/vectors/dayra_laz.svg'),
            ),
          ),
          SizedBox(width: 22.w),
          Expanded(
            // مهم علشان ياخد باقي المساحة
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start, // مهم!
              mainAxisSize: MainAxisSize.min, // مهم!
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'System Reminder Engine',
                      style: TextStyle(
                        fontSize: 16.sp,
                        fontWeight: FontWeight.w500,
                        fontFamily: 'league',
                      ),
                    ),
                    Text(
                      '2 M',
                      textHeightBehavior: TextHeightBehavior(
                        applyHeightToFirstAscent: false,
                        applyHeightToLastDescent: false,
                      ),
                      style: TextStyle(
                        color: Color(0xffA34231),
                        fontSize: 12.sp,
                        fontWeight: FontWeight.w400,
                        fontFamily: 'league',
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 4.h), // مسافة بين العنوان والنص
                Text(
                  'تمت الموافقة على طلب الدعم الخاص ببلاغ كابل كهرباء مقطوع. الفريق في الطريق إليك.',
                  maxLines: 3, // أو null
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w400,
                    fontFamily: 'league',
                  ),
                ),
              ],
            ),
          ),
          SizedBox(width: 30.w),
        ],
      ),
    );
  }
}
