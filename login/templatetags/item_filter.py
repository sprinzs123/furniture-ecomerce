from django import template
register = template.Library()
import json

# def cut(value):
#     value = str(value)
#     return value.upper()
#
# register.filter('cut', cut)

@register.filter(name='cut')
def cut(value):
    value = json.loads(value)
    return list(value.values())