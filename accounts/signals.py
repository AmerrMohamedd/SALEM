

from django.core.mail import send_mail
from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    # ده نص الرسالة اللي هتروح لليوزر
    email_plaintext_message = f"استخدم هذا الرمز لإعادة تعيين كلمة المرور: {reset_password_token.key}"

    send_mail(
        # العنوان
        "إعادة تعيين كلمة المرور لـ {title}".format(title="اسم موقعك"),
        # الرسالة
        email_plaintext_message,
        # من (الايميل المسجل في settings.py)
        "noreply@yourdomain.com",
        # إلى
        [reset_password_token.user.email]
    )