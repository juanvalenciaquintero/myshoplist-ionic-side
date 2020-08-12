<?php
//Awarspace pruebanoti
  // $base     = '3260397_shop';
  // $user     = '3260397_shop';
  // $password = '42180200Az';
  // $server   = 'fdb25.awardspace.net';

  //Awarspace estadisticas
  $base     = '3249384_estadisticas';
  $user     = '3249384_estadisticas';
  $password = '42180200Az';
  $server   = 'fdb26.awardspace.net';


  //Byethost
  // $base     = 'b7_21312081_shoplist';
  // $user     = 'b7_21312081';
  // $password = '42180200';
  // $server   = 'sql111.byethost.com';

  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
     $method = $_SERVER['REQUEST_METHOD'];
     if ($method == "OPTIONS") {
         die();
     }

  $db = mysqli_connect($server, $user, $password, $base);

  $request = json_decode(file_get_contents('php://input'));
  //var_dump($request);

  if (mysqli_connect_errno()) {
    printf("Falló la conexión: %s\n", mysqli_connect_error());
    exit();
  }

  if ((isset($_GET['valor'])) && ($_GET['valor']==='1'))
  {
    $sql = mysqli_query($db,'SELECT * FROM articulos_lista AL, articulos_despensa AD WHERE AL.id_articulo = AD.id AND AL.comprado =0 order by pasillo asc, name ');
    $datos=array();
    while($fila =mysqli_fetch_object($sql) )
    {
     array_push($datos,$fila);
    }
    echo json_encode($datos);
  }
  if ((isset($_GET['valor'])) && ($_GET['valor']==='2'))
  {
    $sql = mysqli_query($db,'SELECT * FROM articulos_lista AL, articulos_despensa AD WHERE AL.id_articulo = AD.id AND AL.comprado =1');
    $datos=array();
    while($fila =mysqli_fetch_object($sql) )
    {
     array_push($datos,$fila);
    }
    echo json_encode($datos);
  }

  if ((isset($_GET['valor'])) && ($_GET['valor']==='3'))
  {
    $sql = mysqli_query($db,'SELECT name FROM articulos_despensa WHERE name like "%' . $_GET['name'] . '%"');
    $datos =mysqli_num_rows($sql);
    if ($datos===0){
      echo json_encode($datos);
    } else {
      $datos=array();
      while($fila =mysqli_fetch_array($sql) )
      {
        array_push($datos,$fila['name']);
      }
      echo json_encode($datos);
    }
    //echo json_encode('SELECT * FROM articulos_despensa WHERE name like "%' . $_GET['name'] . '%"');
  }


  if ((isset($request->action)) &&  ($request->action==='update'))
  {
    $usuario  = $request->usuario;
    $articulo = $request->artic;
    $sql = mysqli_query($db,'UPDATE articulos_lista SET comprado =1 WHERE id_articulo=' . $articulo );
    $sql = mysqli_query($db,'SELECT * FROM articulos_lista WHERE id_articulo='. $articulo);
    $result = mysqli_fetch_object($sql);
    $sql = mysqli_query($db,'INSERT INTO articulos_comprados (id_articulo,cantidad,fecha_compra,user_id, id_lista) VALUES (' . $articulo . ',' . $result->cantidad . ', now(),' . $usuario . ',' . $result->id_lista . ')');

  }


  if ((isset($request->action)) &&  ($request->action==='insert'))
  {
    $articulo = $request->artic;
    $sql = mysqli_query($db,'SELECT * FROM articulos_lista WHERE id_articulo=' . $articulo . ' AND comprado=0');
    if (mysqli_num_rows($sql)===0)
    {
      // $query = 'INSERT INTO articulos_lista (nombre,id_lista,fecha,cantidad,comprado) VALUES ("' . $articulo . '",3,now(),4,1)';
      $sql = mysqli_query($db,'INSERT INTO articulos_lista (id_articulo,id_lista,fecha,cantidad,comprado) VALUES (' . $articulo . ',1,now(),1,0)');
    }
  }

  if ((isset($request->action)) &&  ($request->action==='insertDesp'))
  {
    $articulo = $request->artic;

    $sql =  mysqli_query($db,'SELECT * FROM articulos_despensa WHERE name="' . $request->artic . '"');

    if (mysqli_num_rows($sql)===0)
    {
      $sql = mysqli_query($db,'INSERT INTO articulos_despensa (name,fecha) VALUES ("' . $articulo . '",now())');
      echo json_encode(mysqli_insert_id($db));
    } else
    {
      $resp = mysqli_fetch_array($sql);
      echo json_encode($resp['id']);
    }
  }

  if ((isset($request->action)) &&  ($request->action==='delete'))
  {
    if ($request->artic==='comprados')
    {
      $sql = mysqli_query($db,'DELETE FROM articulos_lista WHERE comprado=1');
    }
  }

  if ((isset($_GET['valor'])) && ($_GET['valor']==='4'))
  {
    $sql = mysqli_query($db,'SELECT * FROM articulos_despensa');
    $datos =mysqli_num_rows($sql);
    if ($datos===0){
      echo json_encode($datos);
    } else {
      $datos=array();
      while($fila =mysqli_fetch_array($sql) )
      {
        array_push($datos,$fila);
      }
      echo json_encode($datos);
    }
    //echo json_encode('SELECT * FROM articulos_despensa WHERE name like "%' . $_GET['name'] . '%"');
  }

  if ((isset($request->action)) &&  ($request->action==='updatePurchased'))
  {
    $articulo = $request->artic;
    $sql=mysqli_query($db,'DELETE FROM articulos_lista WHERE id_articulo=' . $articulo . ' AND  comprado=1');
    $sql = mysqli_query($db,'INSERT INTO articulos_lista (id_articulo,id_lista,fecha,cantidad,comprado) VALUES (' . $articulo . ',1,now(),1,0)');
  }

  if ((isset($request->action)) &&  ($request->action==='deleteArtDespensa'))
  {
    $articulo = $request->artic;
    $sql=mysqli_query($db,'DELETE FROM articulos_despensa WHERE id=' . $articulo );
    echo json_encode('DELETE FROM articulos_despensa WHERE id_articulo=' . $articulo);
  }

  if ((isset($_GET['valor'])) && ($_GET['valor']==='5'))
  {
    $id = $_GET['id'];
    $sql = mysqli_query($db,'SELECT * FROM articulos_despensa  WHERE id=' . $id);
    $datos =mysqli_num_rows($sql);
    $fila =mysqli_fetch_object($sql);
    $datos=array();
    array_push($datos,$fila);
    echo json_encode($fila);
  }

if ((isset($request->action)) &&  ($request->action==='deleteArtUnic'))
  {

      $articulo = $request->artic;
      $sql = mysqli_query($db,'DELETE FROM articulos_lista WHERE id_articulo=' . $articulo . ' AND  comprado=0');

  }

  if ((isset($request->action)) &&  ($request->action==='updateArtUnic'))
  {
    $articulo = $request->artic;
    $sql = mysqli_query($db, 'UPDATE articulos_despensa
            SET name="' . $articulo->name . '",
                brand ="' . $articulo->brand . '",
                supermarket="' . $articulo->supermarket . '",
                price ="' . $articulo->price . '",
                fecha="' . $articulo->fecha . '" WHERE id=' .$articulo->id);

  }

  if ((isset($request->action)) &&  ($request->action==='checkLogin'))
  {
    $usuario = $request->usuario;
    $password = $request->password;

    $sql = mysqli_query($db,'SELECT * FROM usuarios  WHERE nombre="' . $usuario . '"' );
    if (mysqli_num_rows($sql)>0)
    {
      $datos =mysqli_fetch_object($sql);
      $existe = (password_verify($password, $datos->pass));
      if ($existe)
      {
        echo json_encode($datos->id);
      }else{
        echo json_encode('false');
      }
    } else
    {
      echo json_encode('false');
    }
  }

  if (isset($_GET['pass']))
  {
    $nombre = $_GET['pass'];
    $pass = password_hash($nombre, PASSWORD_DEFAULT);

    $sql = mysqli_query($db,'UPDATE usuarios SET pass="' .$pass . '" WHERE id=1');

  }

  if ((isset($_GET['valor'])) && ($_GET['valor']==='6'))
  {
    $usuario = $_GET['id'];
    $sql = mysqli_query($db,'SELECT * FROM usuarios  WHERE id=' . $usuario );
    $datos =mysqli_fetch_object($sql);
    echo json_encode($datos);
  }


if ((isset($request->action)) &&  ($request->action==='updateUser'))
{
  $usuario = $request->usuario;
  $sql = mysqli_query($db,'UPDATE usuarios SET nombre="' . $usuario->nombre . '"  WHERE id=' . $usuario->id );

  echo json_encode($usuario->id);
}

if ((isset($request->action)) &&  ($request->action==='updatePass'))
{
  $usuario = $request->usuario;
  $newPassword = $request->password;
  $pass = password_hash($newPassword , PASSWORD_DEFAULT);
  $sql = mysqli_query($db,'UPDATE usuarios SET pass="' . $pass . '"  WHERE id=' . $usuario->id );

  echo json_encode($usuario->id);
}

if ((isset($request->action)) &&  ($request->action==='nuevoArtDesp'))
  {
    $articulo = $request->artic;

    $sql =  mysqli_query($db,'SELECT * FROM articulos_despensa WHERE name="' . $articulo->name . '"');

    if (mysqli_num_rows($sql)===0)
    {
      $salida = 'INSERT INTO articulos_despensa (name,brand,supermarket,price,fecha, pasillo) VALUES ("' . $articulo->name . '",now(),"' .  $articulo->brand .'","' .  $articulo->supermarket .'","' .  $articulo->price .'","' .  $articulo->fecha .'","' .  $articulo->pasillo .'")';
      $sql = mysqli_query($db,'INSERT INTO articulos_despensa (name,brand,supermarket,price,fecha, pasillo) VALUES ("' . $articulo->name . '","' .  $articulo->brand .'","' .  $articulo->supermarket .'","' .  $articulo->price .'","' .  $articulo->fecha .'","' .  $articulo->pasillo .'")');
      echo json_encode($salida);
      // echo json_encode(mysqli_insert_id($db));
    } else
    {
      $salida = 'Articulo ya existe';
      $resp = mysqli_fetch_array($sql);
    echo json_encode($salida);
      // echo json_encode($resp['id']);
    }
  }

  if ((isset($_GET['valor'])) && ($_GET['valor']==='7'))
  {
    $sql = mysqli_query($db,"SELECT distinct(id_lista), sum(cantidad) as cantidad, DATE_FORMAT(fecha_compra, '%d-%m-%Y')as fecha FROM articulos_comprados GROUP BY fecha ORDER BY fecha_compra DESC ");
    $datos=array();
    while($fila =mysqli_fetch_array($sql) )
    {
      array_push($datos,$fila);
    }
    echo json_encode($datos);

  }


if ((isset($_GET['partitura'])) && ($_GET['partitura']!==''))
{
  $sql = 'SELECT * FROM partituras WHERE cancion like"%' . $_GET['partitura'] . '%"';
  // echo $sql;
  $sqlPart = mysqli_query($db,$sql);
  $numDatos =mysqli_num_rows($sqlPart);
  $datos=array('datos'=>'sin datos');
  if ($numDatos>0){
    $datos =mysqli_fetch_object($sqlPart);
    echo json_encode($datos);
    // $datos=array();
    // while($fila =mysqli_fetch_array($sqlPart) )
    // {
    //   array_push($datos,$fila);
    // }


  }
echo json_encode($datos);
}


?>
