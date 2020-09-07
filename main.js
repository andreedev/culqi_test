//Llave pública de la cuenta del destinatario
Culqi.publicKey = 'pk_test_c38e6c7dde5f4b75';

producto = $('#buyButton').attr('data-producto');
precio = '1000';

//Capturar el evento click del boton Pagar
$('#buyButton').on('click', function (e) {
    Culqi.settings({
        title: 'Compra de Paquetes',
        currency: 'PEN',
        description: producto,
        amount: precio
    });

    // Abre el formulario de pago
    Culqi.open();
    e.preventDefault();
});

function culqi() {
    //Evalua si los datos ingresados son correctos y se crea un objeto TOKEN con éxito
    if (Culqi.token) {
        var token = Culqi.token.id;
        var email = Culqi.token.email;

        $.ajax({
            type: "POST",
            url: "proceso.php",
            data: {
                email: email,
                token: token,
                precio: precio,
                descripcion: producto
            },
            dataType: 'json',
            // contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log(JSON.parse(JSON.stringify(data)));
                if(data.outcome.type == "venta_exitosa"){
                    alert('La transacción se ha realizado con éxito');
                    dataResponse(data);
                }
            },
            error: function (error) {
                document.write(error.responseText);
            }
        });
    }
    // ¡Hubo algún problema!
    else {
        // Mostramos JSON de objeto error en consola
        console.log(Culqi.error);
        alert(Culqi.error.user_message);
    }
};

//Mostrar datos de respuesta
function dataResponse(data){
    let rp = data;
    $('.rp').html(`
        Monto: S/${(rp.amount)} <br>
        Descripción: ${rp.description} <br>
        Email: ${rp.email} <br>
        Id del cargo: ${rp.id} <br>
        Estado: ${rp.outcome.type} <br>
        Código de referencia: ${rp.reference_code} <br>
        Número de tarjeta: ${rp.source.card_number} <br>
        País de origen de compra: ${rp.source.client.ip_country} <br>
        Banco: ${rp.source.iin.issuer.name} <br>
        Comisión de Culqi: S/${rp.total_fee} <br>
        Monto bruto a transferir: S/${rp.transfer_amount} <br>
        <i>Puede ver la respuesta en la consola</i>
        `
    );
};