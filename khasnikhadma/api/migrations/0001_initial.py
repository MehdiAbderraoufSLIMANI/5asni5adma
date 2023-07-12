# Generated by Django 4.2.3 on 2023-07-10 17:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254)),
                ('password', models.CharField(max_length=50)),
                ('nom', models.CharField(max_length=50)),
                ('prenom', models.CharField(max_length=50)),
                ('tel', models.IntegerField()),
                ('isBanned', models.BooleanField()),
                ('compte_type', models.CharField(editable=False, max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='usertest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(default=' ', max_length=50)),
                ('password', models.TextField(default=' ', max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Artisan',
            fields=[
                ('person_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='api.person')),
                ('numb_card_national', models.IntegerField()),
                ('wilaya', models.CharField(max_length=50)),
                ('commune', models.CharField(max_length=50)),
                ('adresse', models.CharField(max_length=50)),
                ('rating', models.FloatField(default=0, editable=False, max_length=1)),
                ('category_of_worker', models.CharField(default=' ', max_length=10)),
            ],
            bases=('api.person',),
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('person_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='api.person')),
                ('wilaya', models.CharField(max_length=50)),
                ('commune', models.CharField(max_length=50)),
                ('adresse', models.CharField(max_length=50)),
            ],
            bases=('api.person',),
        ),
        migrations.CreateModel(
            name='Administrateur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('last_name', models.CharField(max_length=255, verbose_name='Last name')),
                ('first_name', models.CharField(max_length=255, verbose_name='First name')),
                ('email', models.EmailField(max_length=255, unique=True, verbose_name='email address')),
                ('password2', models.CharField(max_length=255, null=True, verbose_name='Password confirmation')),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
