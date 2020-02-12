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
    # string what in json format into dictionary
    value = json.loads(value)
    all_keys = list(value.keys())
    all_values = list(value.values())
    count = 0
    for i in all_keys:
        all_values[count].append(i)
        count += 1

    return all_values