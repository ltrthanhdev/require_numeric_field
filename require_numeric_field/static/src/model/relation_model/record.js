/** @odoo-module **/
import { Record } from "@web/model/relational_model/record";
import { patch } from "@web/core/utils/patch";
import { markup } from "@odoo/owl";
import { escape } from "@web/core/utils/strings";
import { _t } from "@web/core/l10n/translation";

patch(Record.prototype, {
    _checkValidity({ silent, displayNotification, removeInvalidOnly } = {}) {
        for (const fieldName in this.activeFields) {
            const fieldType = this.fields[fieldName].type;
            if (this._isInvisible(fieldName) || this.fields[fieldName].relatedPropertyField) {
                continue;
            }
            if (["float", "integer"].includes(fieldType)) {
                const val = this.data[fieldName];
                console.log(fieldName, ':', this.activeFields[fieldName].value)
                if (this._isRequired(fieldName) && val === 0) {
                    this._setInvalidField(fieldName);
                }
            }
        }
        return super._checkValidity({ silent, displayNotification, removeInvalidOnly });
    },
});