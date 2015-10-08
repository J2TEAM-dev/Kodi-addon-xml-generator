'use strict';

jQuery(document).ready(function($) {
    var prevData = '',
        clipboard = new Clipboard('#copyBtn');

    // Handle clipboard events
    clipboard.on('success', function(e) {
        $.smkAlert({
            text: 'Data has been copied!',
            type: 'success',
            time: 3
        });

        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);
        e.clearSelection();
    }).on('error', function(e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });

    // Init tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Update XML content for download button
    $('#downloadBtn').on('mouseover', function(event) {
        var currentData = $('#addonXML').text();

        if (prevData !== currentData) {
            var dataURI = 'data:text/xml;base64,' + btoa(currentData); // Base64 encode
            $(this).attr('href', dataURI);

            prevData = currentData;
        }
    }).on('click', function() {
        $.smkAlert({
            text: 'Starting download...',
            type: 'success',
            time: 3
        });
    });

    // Focus to first input when user click reset button
    $('button[type="reset"]').click(function(event) {
        $(window).scrollTo($('#header'), 500, function() {
            $('#addon-id').focus();
        });
    });

    $('#copyBtn, #downloadBtn').click(function() {
        $(this).blur();
    });
});