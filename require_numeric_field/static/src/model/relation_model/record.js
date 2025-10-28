/** @odoo-module **/
import { Record } from "@web/model/relational_model/record";
import { patch } from "@web/core/utils/patch";
import { markup } from "@odoo/owl";
import { escape } from "@web/core/utils/strings";
import { _t } from "@web/core/l10n/translation";
import { evaluateExpr } from "@web/core/py_js/py";

patch(Record.prototype, {
    _checkValidity({ silent, displayNotification, removeInvalidOnly } = {}) {
        for (const fieldName in this.activeFields) {
            const activeField = this.activeFields[fieldName];
            const fieldType = this.fields[fieldName].type;
            let skip_check_requirement =  false;
            if (this._isInvisible(fieldName) || this.fields[fieldName].relatedPropertyField) {
                continue;
            }
            if (["float", "integer"].includes(fieldType)) {
                const val = this.data[fieldName];
                skip_check_requirement = evaluateExpr(activeField.context, this.evalContextWithVirtualIds).skip_check_requirement || false;
                if (this._isRequired(fieldName) && val === 0 && !skip_check_requirement) {
                    this._setInvalidField(fieldName);
                }
            }
        }
        return super._checkValidity({ silent, displayNotification, removeInvalidOnly });
    },
});