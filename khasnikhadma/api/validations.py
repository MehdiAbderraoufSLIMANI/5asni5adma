from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator

from django.shortcuts import redirect 
UserModel = get_user_model()

def custom_validation(data):
    email = data['email'].strip()
    username = data['username'].strip()
    password = data['password'].strip()
    ##
    if not email or UserModel.objects.filter(email=email).exists():
        raise ValidationError('choose another email')
    ##
    if not password or len(password) < 8:
        raise ValidationError('choose another password, min 8 characters')
    ##
    if not username:
        raise ValidationError('choose another username')
    return data


from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
import secrets


def generate_email_verification_token():
    token = secrets.token_hex(16)
    return token





def send_validation_email(token,email,id,type_account):
    activation_link = f'http://localhost:3000/ValidationPage?token={token}&id={id}&typea={type_account}'  # Replace with your actual activation link
    email_subject = 'Activate your account'
    from_email = '5asni5adma@gmail.com'  # Replace with your email address

    # Render the email template with the activation link
 
    email_text = strip_tags(activation_link)  # Strip HTML tags for the plain text version

    # Send the email
    
    send_mail(subject = email_subject,
              message = email_text,
              from_email = from_email,
              recipient_list = [email]  )