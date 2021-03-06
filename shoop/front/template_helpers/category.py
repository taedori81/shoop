# -*- coding: utf-8 -*-
# This file is part of Shoop.
#
# Copyright (c) 2012-2015, Shoop Ltd. All rights reserved.
#
# This source code is licensed under the AGPLv3 license found in the
# LICENSE file in the root directory of this source tree.
from django.utils.translation import get_language
from jinja2.utils import contextfunction

from shoop.core.models import Manufacturer


@contextfunction
def get_manufacturers(context):
    request = context["request"]
    category = context["category"]
    manufacturers_ids = (
        category.products
        .all_visible(request, language=get_language())
        .values_list("manufacturer__id")
        .distinct()
    )
    return Manufacturer.objects.filter(pk__in=manufacturers_ids)
