from django import template
register = template.Library()
import json

# custom filters for django templates
# need to reboot app when adding new filter

# display json file from all items for order as a list
# use indexing to show specific item from array
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


@register.filter(name='last_four')
def cut(value):
    value = str(value)
    return value[-5:-1]