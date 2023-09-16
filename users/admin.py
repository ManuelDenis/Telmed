from django.contrib import admin
from users.models import CustomUser, ProfileMed, CommentProfileMed, DoctorVote


class DoctorVoteInline(admin.TabularInline):
    model = DoctorVote
    readonly_fields = ('vote',)
    extra = 0


class CommentProfileMedInline(admin.TabularInline):
    model = CommentProfileMed
    readonly_fields = ('text',)
    extra = 0


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email')


@admin.register(ProfileMed)
class ProfileMedAdmin(admin.ModelAdmin):
    inlines = [CommentProfileMedInline, DoctorVoteInline]
    list_display = ('id', 'user')


admin.site.register(CommentProfileMed)
admin.site.register(DoctorVote)
