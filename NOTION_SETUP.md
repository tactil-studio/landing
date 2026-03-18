# 📋 Configuración de Notion para el Formulario de Contacto

Esta guía te ayudará a configurar la integración con Notion para guardar automáticamente los contactos del formulario.

## 🔧 Paso 1: Crear la Integración de Notion

1. Ve a [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Haz clic en **"+ New integration"**
3. Configura la integración:
   - **Name**: `Tactil Contact Form` (o el nombre que prefieras)
   - **Associated workspace**: Selecciona tu workspace
   - **Type**: Internal
   - **Capabilities**: 
     - ✅ Read content
     - ✅ Insert content
     - ✅ Update content
4. Haz clic en **"Submit"**
5. **Copia el "Internal Integration Token"** (empieza con `secret_`)
6. Guárdalo en tu archivo `.env`:
   ```env
   NOTION_INTEGRATION_SECRET=secret_tu_token_aqui
   ```

## 📊 Paso 2: Crear la Base de Datos en Notion

1. Abre Notion y crea una nueva página
2. Añade una **Database - Table** (Base de datos - Tabla)
3. Nómbrala: **"Contactos Web"** (o como prefieras)

### Propiedades Requeridas

Crea estas propiedades **exactamente con estos nombres**:

| Nombre | Tipo | Descripción |
|--------|------|-------------|
| `Name` | Title | Nombre del contacto (ya existe por defecto) |
| `Email` | Email | Email del contacto |
| `Phone` | Phone | Teléfono |
| `company` | Rich Text | Empresa (opcional) |
| `message` | Rich Text | Mensaje del contacto |
| `date` | Date | Fecha y hora del contacto |
| `timezone` | Rich Text | Zona horaria del usuario |
| `language` | Rich Text | Idioma del navegador |
| `ip` | Rich Text | Dirección IP |
| `browser` | Rich Text | Navegador usado |
| `os` | Rich Text | Sistema operativo |
| `device` | Rich Text | Tipo de dispositivo |
| `userAgent` | Rich Text | User Agent completo |
| `referrer` | Rich Text | Página de referencia |
| `utm-source` | Rich Text | UTM Source |
| `utm-medium` | Rich Text | UTM Medium |
| `utm-campaign` | Rich Text | UTM Campaign |

### Cómo Añadir Propiedades

1. Haz clic en el **"+"** al lado de la última columna
2. Selecciona el tipo de propiedad
3. Escribe el nombre exacto
4. Presiona Enter

## 🔗 Paso 3: Compartir la Base de Datos con la Integración

1. Abre tu base de datos en Notion
2. Haz clic en los **tres puntos** (⋯) en la esquina superior derecha
3. Selecciona **"Add connections"** o **"Añadir conexiones"**
4. Busca y selecciona tu integración: **"Tactil Contact Form"**
5. Haz clic en **"Confirm"**

## 🆔 Paso 4: Obtener el Database ID

1. Abre tu base de datos en Notion
2. Copia la URL del navegador. Se verá así:
   ```
   https://www.notion.so/workspace/32caracteres?v=otroscaracteres
   ```
3. El **Database ID** son los **32 caracteres** entre el nombre del workspace y el `?v=`
4. Ejemplo:
   ```
   URL: https://www.notion.so/myworkspace/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6?v=...
   Database ID: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
   ```
5. Guárdalo en tu archivo `.env`:
   ```env
   NOTION_DATABASE_ID=tu_database_id_aqui
   ```

## ✅ Paso 5: Verificar la Configuración

Tu archivo `.env` debería verse así:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_INTEGRATION_SECRET=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 🧪 Paso 6: Probar la Integración

1. Reinicia tu servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Llena el formulario de contacto en tu sitio

3. Envía el formulario

4. Verifica en Notion que se haya creado una nueva fila con todos los datos

## 🎯 Resultado Esperado

Cuando alguien envíe el formulario:

1. ✅ Recibirás un **email** con los datos del contacto
2. ✅ Se creará una **nueva fila en Notion** con:
   - Datos del contacto (nombre, email, teléfono, mensaje)
   - Metadata (fecha, timezone, idioma)
   - Información técnica (IP, browser, OS, device)
   - UTM parameters (si existen)
   - Referrer (de dónde vino el usuario)

## 🔒 Seguridad

- ✅ Nunca compartas tu `NOTION_INTEGRATION_SECRET`
- ✅ Añade `.env` a tu `.gitignore`
- ✅ En Vercel, añade las variables de entorno en: Settings → Environment Variables

## 🆘 Troubleshooting

### Error: "Could not find database"
- Verifica que el Database ID sea correcto
- Asegúrate de haber compartido la base de datos con la integración

### Error: "Unauthorized"
- Verifica que el Integration Secret sea correcto
- Asegúrate de que la integración tenga permisos de lectura y escritura

### No se crean filas en Notion
- Verifica que los nombres de las propiedades sean exactos (case-sensitive)
- Revisa los logs del servidor para ver errores específicos

## 📚 Recursos

- [Notion API Documentation](https://developers.notion.com/)
- [Notion Integrations](https://www.notion.so/my-integrations)
- [Resend Documentation](https://resend.com/docs)

