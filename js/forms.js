var searchParams = window.location.search;
var parsedSearchParams = {}

let countriesTranslationObject = {
    "BA": {
        'name': 'Unesite ime',
        'phone': 'Unesite broj telefona'
    },
    "MA": {
        'name': 'أدخل الاسم',
        'phone': 'أدخل رقم الهاتف'
    },
    "CG": {
        'name': 'Entrez le nom',
        'phone': 'Entrez le numéro de téléphone'
    },
    "SN": {
        'name': 'Entrez le nom',
        'phone': 'Entrez le numéro de téléphone'
    },
    "KW": {
        'name': 'أدخل الاسم',
        'phone': 'أدخل رقم الهاتف'
    },
    "BH": {
        'name': 'أدخل الاسم',
        'phone': 'أدخل رقم الهاتف'
    },
    "KE": {
        'name': 'Enter name',
        'phone': 'Enter phone number'
    },
    "UG": {
        'name': 'Enter name',
        'phone': 'Enter phone number'
    },
    "AE": {
        'name': 'Enter name',
        'phone': 'Enter phone number'
    },
    "PH": {
        'name': 'Enter name',
        'phone': 'Enter phone number'
    },
    "CH": {
        'name': 'Geben Sie Ihren Namen ein',
        'phone': 'Geben Sie Ihre Telefonnummer ein'
    },
    "SK": {
        'name': 'Zadajte meno',
        'phone': 'Zadajte telefónne číslo'
    },
    "PL": {
        'name': 'Wprowadź imię',
        'phone': 'Wprowadź numer telefonu'
    },
    "GN": {
        'name': 'Entrez le nom',
        'phone': 'Entrez le numéro de téléphone'
    },
    "CI": {
        'name': 'Entrez le nom',
        'phone': 'Entrez le numéro de téléphone'
    },
    "CL": {
        'name': 'Tu nombre',
        'phone': 'Número de teléfono'
    },
    "AT": {
        'name': 'Geben Sie einen Namen ein',
        'phone': 'Eine Telefonnummer eingeben'
    },
    "DE": {
        'name': 'Geben Sie einen Namen ein',
        'phone': 'Eine Telefonnummer eingeben'
    },
    "RO": {
        'name': 'Introduceți un nume',
        'phone': 'Introduceti un numar de telefon'
    },
    "RS": {
        'name': 'Unesite ime',
        'phone': 'Unesite broj telefona'
    },
    "ME": {
        'name': 'Unesite ime',
        'phone': 'Unesite broj telefona'
    },
    "MK": {
        'name': 'Bнесете име',
        'phone': 'Телефонски број'
    },
    "AL": {
        'name': 'Shkruaj një emër',
        'phone': 'Numër telefoni'
    },
    "HR": {
        'name': 'Unesite ime',
        'phone': 'Unesite broj telefona'
    },
    "TR": {
        'name': 'Isim girin',
        'phone': 'Telefon numaranızı giriniz'
    },
    "SI": {
        'name': 'Vnesite ime',
        'phone': 'Telefonska številka'
    },
    "XK": {
        'name': 'Shkruaj një emër',
        'phone': 'Numër telefoni'
    },
    "IT": {
        "name": 'Inserisci nome',
        'phone': 'Numero di telefono'
    },
    "ALL": {
        'name': 'Enter a name',
        'phone': 'Enter phone number'
    },
    "HU": {
        'name': 'Adjon meg egy nevet',
        'phone': 'Adja meg a telefonszámot'
    },
    "ES": {
        'name': 'Tu nombre',
        'phone': 'Número de teléfono'
    },
    "CO": {
        'name': 'Tu nombre',
        'phone': 'Número de teléfono'
    },
    "MX": {
        'name': 'Tu nombre',
        'phone': 'Número de teléfono'
    },
    "AR": {
        'name': 'Tu nombre',
        'phone': 'Número de teléfono'
    },
    "PE": {
        'name': 'Tu nombre',
        'phone': 'Número de teléfono'
    },
    "BG": {
        'name': 'Въведете име',
        'phone': 'Въведете телефонния номер'
    }
};

// set country code
function setSettingsCountry(country_code) {
    selectedCountry = (typeof settingsObject[country_code] !== 'undefined') ? country_code : defaultCountry
    return ((typeof settingsObject[country_code] !== 'undefined') ? settingsObject[country_code] : settingsObject[defaultCountry])
}

$(document).ready(function () {
    let isValid = false
    let errorSubmited = false

    let countryValidation = defaultCountry;

    // Update select field from settings country
    function updateCountrySelect() {
        let html = '';
        $.each(settingsObject, function (index, value) {
            let selected = ((defaultCountry == index) ? ' selected="selected"' : '');
            html += '<option value="' + index + '" ' + selected + '>' + value.name + '</option>';
        });
        $('select[name="country_code"]').html(html);
    }

    // Update country inputs
    // updateCountrySelect();

    // Set label error 
    $.each($('input'), function (index, value) {
        let type = $(value).attr('type');
        // Label ne treba za hidden inpute
        if (type != 'hidden') {
            $('<label id="' + $(value).attr('name') + '-error" class="errorValidate" for="' + $(value).attr('name') + '" style="display:none;"></label>').insertBefore(this);
        }
        // Ugasi autocomplete
        $(this).attr('autocomplete', 'off');
    });

    let formRender = {
        localSettings: settings,
        form: '',
        selectPackage: 'select[name="quantity"]',
        phoneInput: 'input[name="phone"]',
        updatePackageOption: function () {
            let html = '';
            $.each(this.localSettings.paketi, function (index, value) {
                html += '<option value="' + value.quantity + '">' + value.name + '</option>';
            });
            $(this.form).find(this.selectPackage).html(html);
        },
        updatePhoneInput: function () {
            $(this.form).find("input[name='phone']").val(this.localSettings.phonePrefix);
        },
        updateHidden: function () {
            $(this.form).find("input[name='offer_id']").val(this.localSettings.offer_id);
        },
        updateFirstPrice: function () {
            $('.' + oldPriceClass).text(getPrice(this.localSettings.paketi[0].oldPrice));
            $('.' + newPriceClass).text(getPrice(this.localSettings.paketi[0].newPrice));
        },
    }

    $.validator.addMethod(
        "regex",
        function (value, element, regexp) {
            if (regexp.constructor != RegExp)
                regexp = new RegExp(regexp);
            else if (regexp.global)
                regexp.lastIndex = 0;
            return this.optional(element) || regexp.test(value);
        },
        "Provjerite polje."
    );

    $.validator.messages.required = 'Popunite ovo polje';

    var first = '';

    function getRegExPhoneText() {
        return settings.phonePrefix + 'xxxxxxxx';
    }

    var validator = [];

    function createValidate() {
        try {
            $.each($('form'), function (index, value) {
                // ponisti prije validator i kreiraj novi
                if (validator[index]) {
                    validator[index].destroy();
                }
                // Select
                $.each($(value).find('select'), function (index2, value2) {
                    let name = $(value2).attr('name');
                    formRender.form = value;
                    if (name == 'quantity') {
                        formRender.updatePackageOption();
                    }
                })
                validator[index] = $(value).validate({
                    errorClass: "errorValidate",
                    highlight: function (element) {
                        $(element).addClass("errorBorder");
                        if (!first) {
                            first = element;
                            $(element).focus();
                        }
                        return false;
                    },
                    unhighlight: function (element) {
                        $(element).removeClass("errorBorder");
                        first = '';
                        return false;
                    },
                    rules: {
                        'name': {
                            required: true,
                            regex: '^.{3,40}$'
                        },
                        'phone': {
                            required: true,
                            regex: '^[\\+ 0-9\\-]{7,15}$'
                        }
                    },
                    messages: {
                        'name': {
                            required: countriesTranslationObject[countryValidation]['name'],
                            regex: countriesTranslationObject[countryValidation]['name']
                        },
                        'phone': {
                            required: getRegExPhoneText(),
                            regex: getRegExPhoneText()
                        }
                    }
                });
            });
        } catch (error) {
            console.warn(error)
        }
    }
    $('form').on('submit', function (event) {

        let form = $(this).closest('form')[0];

        if (!$(form).valid()) {
            event.preventDefault();
            errorSubmited = true
            return false;
        }
        if (isValid) {
            event.preventDefault();
            return false;
        }
        isValid = true;
    });

    createValidate();
});