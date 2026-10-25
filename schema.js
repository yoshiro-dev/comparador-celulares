export const catalogSchema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Catálogo de celulares v3",
  "type": "object",
  "required": [
    "version",
    "celulares",
    "preferencias",
    "comparativas"
  ],
  "properties": {
    "version": {
      "const": 3
    },
    "celulares": {
      "type": "array",
      "items": {
        "type": "object",
        "title": "Identificación",
        "properties": {
          "id": {
            "type": "string",
            "title": "ID permanente",
            "minLength": 1,
            "maxLength": 160,
            "pattern": "^[A-Za-z0-9_-]+$"
          },
          "nombre": {
            "type": "string",
            "title": "Nombre para mostrar",
            "minLength": 1,
            "maxLength": 160
          },
          "marca": {
            "type": [
              "string",
              "null"
            ],
            "title": "Marca",
            "maxLength": 4000
          },
          "modelo": {
            "type": [
              "string",
              "null"
            ],
            "title": "Modelo",
            "maxLength": 4000
          },
          "familia": {
            "type": [
              "string",
              "null"
            ],
            "title": "Familia",
            "maxLength": 4000
          },
          "codigo_modelo": {
            "type": [
              "string",
              "null"
            ],
            "title": "Codigo modelo",
            "maxLength": 4000
          },
          "region": {
            "type": [
              "string",
              "null"
            ],
            "title": "Region",
            "maxLength": 4000
          },
          "fecha_anuncio": {
            "type": [
              "string",
              "null"
            ],
            "title": "Fecha anuncio",
            "format": "date"
          },
          "fecha_lanzamiento": {
            "type": [
              "string",
              "null"
            ],
            "title": "Fecha lanzamiento",
            "format": "date"
          },
          "colores": {
            "type": "array",
            "title": "Colores",
            "items": {
              "type": [
                "string",
                "null"
              ],
              "title": "Valor",
              "maxLength": 4000
            },
            "maxItems": 200
          },
          "color_variante": {
            "type": [
              "string",
              "null"
            ],
            "title": "Color variante",
            "maxLength": 4000
          },
          "diseno": {
            "type": "object",
            "title": "Diseño y construcción",
            "properties": {
              "alto_mm": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Alto mm",
                "minimum": 0
              },
              "ancho_mm": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Ancho mm",
                "minimum": 0
              },
              "grosor_mm": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Grosor mm",
                "minimum": 0
              },
              "peso_g": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Peso g",
                "minimum": 0
              },
              "material_marco": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Material marco",
                "maxLength": 4000
              },
              "material_trasera": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Material trasera",
                "maxLength": 4000
              },
              "proteccion_frontal": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Proteccion frontal",
                "maxLength": 4000
              },
              "proteccion_trasera": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Proteccion trasera",
                "maxLength": 4000
              },
              "certificaciones_resistencia": {
                "type": "array",
                "title": "Certificaciones resistencia",
                "items": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Valor",
                  "maxLength": 4000
                },
                "maxItems": 200
              },
              "resistencia_agua_condiciones": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Resistencia agua condiciones",
                "maxLength": 4000
              },
              "plegable": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Plegable"
              },
              "tipo_plegado": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Tipo plegado",
                "maxLength": 4000
              },
              "alto_plegado_mm": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Alto plegado mm",
                "minimum": 0
              },
              "ancho_plegado_mm": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Ancho plegado mm",
                "minimum": 0
              },
              "grosor_plegado_mm": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Grosor plegado mm",
                "minimum": 0
              },
              "colocacion_botones": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Colocacion botones",
                "maxLength": 4000
              },
              "notas_construccion": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Notas construccion",
                "maxLength": 4000
              }
            },
            "additionalProperties": true
          },
          "pantallas": {
            "type": "array",
            "title": "Pantallas",
            "items": {
              "type": "object",
              "title": "Pantalla",
              "properties": {
                "id": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Id",
                  "maxLength": 4000
                },
                "rol": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Rol",
                  "maxLength": 4000
                },
                "tecnologia": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Tecnologia",
                  "maxLength": 4000
                },
                "diagonal_pulgadas": {
                  "type": [
                    "number",
                    "null"
                  ],
                  "title": "Diagonal pulgadas",
                  "minimum": 0
                },
                "resolucion_ancho_px": {
                  "type": [
                    "number",
                    "null"
                  ],
                  "title": "Resolucion ancho px",
                  "minimum": 0
                },
                "resolucion_alto_px": {
                  "type": [
                    "number",
                    "null"
                  ],
                  "title": "Resolucion alto px",
                  "minimum": 0
                },
                "densidad_ppi": {
                  "type": [
                    "number",
                    "null"
                  ],
                  "title": "Densidad ppi",
                  "minimum": 0
                },
                "relacion_aspecto": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Relacion aspecto",
                  "maxLength": 4000
                },
                "refresco_min_hz": {
                  "type": [
                    "number",
                    "null"
                  ],
                  "title": "Refresco min hz",
                  "minimum": 0
                },
                "refresco_max_hz": {
                  "type": [
                    "number",
                    "null"
                  ],
                  "title": "Refresco max hz",
                  "minimum": 0
                },
                "refresco_adaptativo": {
                  "type": [
                    "boolean",
                    "null"
                  ],
                  "title": "Refresco adaptativo"
                },
                "ltpo": {
                  "type": [
                    "boolean",
                    "null"
                  ],
                  "title": "Ltpo"
                },
                "muestreo_tactil_hz": {
                  "type": [
                    "number",
                    "null"
                  ],
                  "title": "Muestreo tactil hz",
                  "minimum": 0
                },
                "brillo_tipico_nits": {
                  "type": [
                    "number",
                    "null"
                  ],
                  "title": "Brillo tipico nits",
                  "minimum": 0
                },
                "brillo_hbm_nits": {
                  "type": [
                    "number",
                    "null"
                  ],
                  "title": "Brillo hbm nits",
                  "minimum": 0
                },
                "brillo_pico_nits": {
                  "type": [
                    "number",
                    "null"
                  ],
                  "title": "Brillo pico nits",
                  "minimum": 0
                },
                "condiciones_brillo_pico": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Condiciones brillo pico",
                  "maxLength": 4000
                },
                "profundidad_color_bits": {
                  "type": [
                    "number",
                    "null"
                  ],
                  "title": "Profundidad color bits",
                  "minimum": 0
                },
                "formatos_hdr": {
                  "type": "array",
                  "title": "Formatos hdr",
                  "items": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "title": "Valor",
                    "maxLength": 4000
                  },
                  "maxItems": 200
                },
                "gama_color": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Gama color",
                  "maxLength": 4000
                },
                "cobertura_color_porcentaje": {
                  "type": [
                    "number",
                    "null"
                  ],
                  "title": "Cobertura color porcentaje",
                  "minimum": 0,
                  "maximum": 100
                },
                "pwm_hz": {
                  "type": [
                    "number",
                    "null"
                  ],
                  "title": "Pwm hz",
                  "minimum": 0
                },
                "atenuacion_dc": {
                  "type": [
                    "boolean",
                    "null"
                  ],
                  "title": "Atenuacion dc"
                },
                "always_on_display": {
                  "type": [
                    "boolean",
                    "null"
                  ],
                  "title": "Always on display"
                },
                "curvatura": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Curvatura",
                  "maxLength": 4000
                },
                "proteccion": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Proteccion",
                  "maxLength": 4000
                },
                "compatibilidad_stylus": {
                  "type": [
                    "boolean",
                    "null"
                  ],
                  "title": "Compatibilidad stylus"
                }
              },
              "additionalProperties": true
            },
            "maxItems": 200
          },
          "procesador": {
            "type": "object",
            "title": "Procesador",
            "properties": {
              "fabricante": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Fabricante",
                "maxLength": 4000
              },
              "modelo": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Modelo",
                "maxLength": 4000
              },
              "proceso_nm": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Proceso nm",
                "minimum": 0
              },
              "arquitectura": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Arquitectura",
                "maxLength": 4000
              },
              "cpu_nucleos_total": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Cpu nucleos total",
                "minimum": 0
              },
              "gpu_modelo": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Gpu modelo",
                "maxLength": 4000
              },
              "gpu_frecuencia_mhz": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Gpu frecuencia mhz",
                "minimum": 0
              },
              "npu_modelo": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Npu modelo",
                "maxLength": 4000
              },
              "modem_modelo": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Modem modelo",
                "maxLength": 4000
              },
              "refrigeracion_tipo": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Refrigeracion tipo",
                "maxLength": 4000
              },
              "camara_vapor_mm2": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Camara vapor mm2",
                "minimum": 0
              },
              "cpu_clusters": {
                "type": "array",
                "title": "Grupos de núcleos",
                "items": {
                  "type": "object",
                  "title": "Grupo",
                  "properties": {
                    "tipo_nucleo": {
                      "type": [
                        "string",
                        "null"
                      ],
                      "title": "Tipo nucleo",
                      "maxLength": 4000
                    },
                    "cantidad": {
                      "type": [
                        "number",
                        "null"
                      ],
                      "title": "Cantidad",
                      "minimum": 0
                    },
                    "frecuencia_max_ghz": {
                      "type": [
                        "number",
                        "null"
                      ],
                      "title": "Frecuencia max ghz",
                      "minimum": 0
                    }
                  },
                  "additionalProperties": true
                },
                "maxItems": 200
              }
            },
            "additionalProperties": true
          },
          "memoria": {
            "type": "object",
            "title": "Memoria y almacenamiento",
            "properties": {
              "ram_gb": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Ram gb",
                "minimum": 0
              },
              "ram_tipo": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Ram tipo",
                "maxLength": 4000
              },
              "ram_virtual_disponible": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Ram virtual disponible"
              },
              "ram_virtual_max_gb": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Ram virtual max gb",
                "minimum": 0
              },
              "almacenamiento_gb": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Almacenamiento gb",
                "minimum": 0
              },
              "almacenamiento_tipo": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Almacenamiento tipo",
                "maxLength": 4000
              },
              "almacenamiento_version": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Almacenamiento version",
                "maxLength": 4000
              },
              "almacenamiento_disponible_inicial_gb": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Almacenamiento disponible inicial gb",
                "minimum": 0
              },
              "micro_sd": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Micro sd"
              },
              "micro_sd_max_gb": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Micro sd max gb",
                "minimum": 0
              },
              "ranura_micro_sd_compartida_con_sim": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Ranura micro sd compartida con sim"
              }
            },
            "additionalProperties": true
          },
          "camaras": {
            "type": "array",
            "title": "Cámaras",
            "items": {
              "type": "object",
              "title": "Cámara",
              "properties": {
                "id": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Id",
                  "maxLength": 4000
                },
                "posicion": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Posicion",
                  "maxLength": 4000
                },
                "tipo": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Tipo",
                  "maxLength": 4000
                },
                "sensor_fabricante": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Sensor fabricante",
                  "maxLength": 4000
                },
                "sensor_modelo": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Sensor modelo",
                  "maxLength": 4000
                },
                "resolucion_mp": {
                  "type": [
                    "number",
                    "null"
                  ],
                  "title": "Resolucion mp",
                  "minimum": 0
                },
                "resolucion_salida_predeterminada_mp": {
                  "type": [
                    "number",
                    "null"
                  ],
                  "title": "Resolucion salida predeterminada mp",
                  "minimum": 0
                },
                "sensor_formato_optico": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Sensor formato optico",
                  "maxLength": 4000
                },
                "pixel_um": {
                  "type": [
                    "number",
                    "null"
                  ],
                  "title": "Pixel um",
                  "minimum": 0
                },
                "apertura_f_min": {
                  "type": [
                    "number",
                    "null"
                  ],
                  "title": "Apertura f min",
                  "minimum": 0
                },
                "apertura_f_max": {
                  "type": [
                    "number",
                    "null"
                  ],
                  "title": "Apertura f max",
                  "minimum": 0
                },
                "focal_equivalente_mm": {
                  "type": [
                    "number",
                    "null"
                  ],
                  "title": "Focal equivalente mm",
                  "minimum": 0
                },
                "campo_vision_grados": {
                  "type": [
                    "number",
                    "null"
                  ],
                  "title": "Campo vision grados",
                  "minimum": 0
                },
                "autofoco": {
                  "type": [
                    "boolean",
                    "null"
                  ],
                  "title": "Autofoco"
                },
                "autofoco_tipo": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Autofoco tipo",
                  "maxLength": 4000
                },
                "ois": {
                  "type": [
                    "boolean",
                    "null"
                  ],
                  "title": "Ois"
                },
                "eis": {
                  "type": [
                    "boolean",
                    "null"
                  ],
                  "title": "Eis"
                },
                "distancia_enfoque_min_cm": {
                  "type": [
                    "number",
                    "null"
                  ],
                  "title": "Distancia enfoque min cm",
                  "minimum": 0
                },
                "zoom_optico_relativo_x": {
                  "type": [
                    "number",
                    "null"
                  ],
                  "title": "Zoom optico relativo x",
                  "minimum": 0
                },
                "camara_referencia_zoom": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Camara referencia zoom",
                  "maxLength": 4000
                },
                "zoom_optico_continuo": {
                  "type": [
                    "boolean",
                    "null"
                  ],
                  "title": "Zoom optico continuo"
                },
                "pixel_binning": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Pixel binning",
                  "maxLength": 4000
                },
                "formatos_foto": {
                  "type": "array",
                  "title": "Formatos foto",
                  "items": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "title": "Valor",
                    "maxLength": 4000
                  },
                  "maxItems": 200
                },
                "modos_video": {
                  "type": "array",
                  "title": "Modos de video",
                  "items": {
                    "type": "object",
                    "title": "Modo de video",
                    "properties": {
                      "ancho_px": {
                        "type": [
                          "number",
                          "null"
                        ],
                        "title": "Ancho px",
                        "minimum": 0
                      },
                      "alto_px": {
                        "type": [
                          "number",
                          "null"
                        ],
                        "title": "Alto px",
                        "minimum": 0
                      },
                      "fps": {
                        "type": [
                          "number",
                          "null"
                        ],
                        "title": "Fps",
                        "minimum": 0
                      },
                      "hdr": {
                        "type": [
                          "boolean",
                          "null"
                        ],
                        "title": "Hdr"
                      },
                      "codec": {
                        "type": [
                          "string",
                          "null"
                        ],
                        "title": "Codec",
                        "maxLength": 4000
                      },
                      "estabilizacion": {
                        "type": [
                          "string",
                          "null"
                        ],
                        "title": "Estabilizacion",
                        "maxLength": 4000
                      }
                    },
                    "additionalProperties": true
                  },
                  "maxItems": 200
                }
              },
              "additionalProperties": true
            },
            "maxItems": 200
          },
          "fotografia": {
            "type": "object",
            "title": "Funciones de fotografía",
            "properties": {
              "modo_noche": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Modo noche"
              },
              "modo_retrato": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Modo retrato"
              },
              "modo_pro": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Modo pro"
              },
              "captura_raw": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Captura raw"
              },
              "fotografia_macro": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Fotografia macro"
              },
              "zoom_digital_max_x": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Zoom digital max x",
                "minimum": 0
              },
              "flash_tipo": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Flash tipo",
                "maxLength": 4000
              },
              "grabacion_multicamara": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Grabacion multicamara"
              },
              "video_log": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Video log"
              },
              "funciones_edicion": {
                "type": "array",
                "title": "Funciones edicion",
                "items": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Valor",
                  "maxLength": 4000
                },
                "maxItems": 200
              },
              "funciones_ia": {
                "type": "array",
                "title": "Funciones ia",
                "items": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Valor",
                  "maxLength": 4000
                },
                "maxItems": 200
              },
              "notas": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Notas",
                "maxLength": 4000
              }
            },
            "additionalProperties": true
          },
          "bateria": {
            "type": "object",
            "title": "Batería y carga",
            "properties": {
              "capacidad_tipica_mah": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Capacidad tipica mah",
                "minimum": 0
              },
              "capacidad_nominal_mah": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Capacidad nominal mah",
                "minimum": 0
              },
              "energia_wh": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Energia wh",
                "minimum": 0
              },
              "tecnologia": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Tecnologia",
                "maxLength": 4000
              },
              "extraible": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Extraible"
              },
              "carga_cable_max_w": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Carga cable max w",
                "minimum": 0
              },
              "protocolos_carga": {
                "type": "array",
                "title": "Protocolos carga",
                "items": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Valor",
                  "maxLength": 4000
                },
                "maxItems": 200
              },
              "carga_inalambrica": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Carga inalambrica"
              },
              "carga_inalambrica_max_w": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Carga inalambrica max w",
                "minimum": 0
              },
              "estandar_carga_inalambrica": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Estandar carga inalambrica",
                "maxLength": 4000
              },
              "carga_inversa_cable": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Carga inversa cable"
              },
              "carga_inversa_cable_max_w": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Carga inversa cable max w",
                "minimum": 0
              },
              "carga_inversa_inalambrica": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Carga inversa inalambrica"
              },
              "carga_inversa_inalambrica_max_w": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Carga inversa inalambrica max w",
                "minimum": 0
              },
              "carga_bypass": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Carga bypass"
              },
              "limite_carga_configurable": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Limite carga configurable"
              },
              "cargador_incluido": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Cargador incluido"
              },
              "cargador_incluido_w": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Cargador incluido w",
                "minimum": 0
              },
              "cable_incluido": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Cable incluido"
              },
              "requisitos_carga_maxima": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Requisitos carga maxima",
                "maxLength": 4000
              },
              "ciclos_declarados": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Ciclos declarados",
                "minimum": 0
              },
              "capacidad_restante_tras_ciclos_porcentaje": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Capacidad restante tras ciclos porcentaje",
                "minimum": 0,
                "maximum": 100
              },
              "fuente_durabilidad": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Fuente durabilidad",
                "maxLength": 4000
              }
            },
            "additionalProperties": true
          },
          "red_movil": {
            "type": "object",
            "title": "Red móvil y SIM",
            "properties": {
              "soporta_2g": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Soporta 2g"
              },
              "soporta_3g": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Soporta 3g"
              },
              "soporta_4g": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Soporta 4g"
              },
              "soporta_5g": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Soporta 5g"
              },
              "bandas_2g": {
                "type": "array",
                "title": "Bandas 2g",
                "items": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Valor",
                  "maxLength": 4000
                },
                "maxItems": 200
              },
              "bandas_3g": {
                "type": "array",
                "title": "Bandas 3g",
                "items": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Valor",
                  "maxLength": 4000
                },
                "maxItems": 200
              },
              "bandas_4g": {
                "type": "array",
                "title": "Bandas 4g",
                "items": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Valor",
                  "maxLength": 4000
                },
                "maxItems": 200
              },
              "bandas_5g": {
                "type": "array",
                "title": "Bandas 5g",
                "items": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Valor",
                  "maxLength": 4000
                },
                "maxItems": 200
              },
              "soporta_5g_sa": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Soporta 5g sa"
              },
              "soporta_5g_nsa": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Soporta 5g nsa"
              },
              "soporta_mmwave": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Soporta mmwave"
              },
              "sim_fisica_formato": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Sim fisica formato",
                "maxLength": 4000
              },
              "sim_fisica_ranuras": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Sim fisica ranuras",
                "minimum": 0
              },
              "esim": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Esim"
              },
              "sim_activas_max": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Sim activas max",
                "minimum": 0
              },
              "dual_sim_tipo": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Dual sim tipo",
                "maxLength": 4000
              },
              "volte": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Volte"
              },
              "vowifi": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Vowifi"
              },
              "comunicacion_satelital": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Comunicacion satelital"
              },
              "funciones_satelitales": {
                "type": "array",
                "title": "Funciones satelitales",
                "items": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Valor",
                  "maxLength": 4000
                },
                "maxItems": 200
              },
              "restricciones_region_operador": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Restricciones region operador",
                "maxLength": 4000
              }
            },
            "additionalProperties": true
          },
          "conectividad": {
            "type": "object",
            "title": "Conectividad y puertos",
            "properties": {
              "wifi_estandares": {
                "type": "array",
                "title": "Wifi estandares",
                "items": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Valor",
                  "maxLength": 4000
                },
                "maxItems": 200
              },
              "wifi_bandas_ghz": {
                "type": "array",
                "title": "Wifi bandas ghz",
                "items": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Valor",
                  "maxLength": 4000
                },
                "maxItems": 200
              },
              "wifi_mimo": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Wifi mimo",
                "maxLength": 4000
              },
              "bluetooth_version": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Bluetooth version",
                "maxLength": 4000
              },
              "codecs_audio_bluetooth": {
                "type": "array",
                "title": "Codecs audio bluetooth",
                "items": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Valor",
                  "maxLength": 4000
                },
                "maxItems": 200
              },
              "nfc": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Nfc"
              },
              "uwb": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Uwb"
              },
              "infrarrojos": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Infrarrojos"
              },
              "usb_conector": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Usb conector",
                "maxLength": 4000
              },
              "usb_version": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Usb version",
                "maxLength": 4000
              },
              "usb_velocidad_max_gbps": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Usb velocidad max gbps",
                "minimum": 0
              },
              "usb_otg": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Usb otg"
              },
              "salida_video": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Salida video"
              },
              "salida_video_estandar": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Salida video estandar",
                "maxLength": 4000
              },
              "modo_escritorio": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Modo escritorio"
              },
              "pogo_pins": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Pogo pins"
              },
              "jack_3_5_mm": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Jack 3 5 mm"
              },
              "radio_fm": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Radio fm"
              }
            },
            "additionalProperties": true
          },
          "sensores": {
            "type": "object",
            "title": "Ubicación y sensores",
            "properties": {
              "sistemas_gnss": {
                "type": "array",
                "title": "Sistemas gnss",
                "items": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Valor",
                  "maxLength": 4000
                },
                "maxItems": 200
              },
              "gnss_doble_frecuencia": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Gnss doble frecuencia"
              },
              "acelerometro": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Acelerometro"
              },
              "giroscopio": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Giroscopio"
              },
              "magnetometro": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Magnetometro"
              },
              "barometro": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Barometro"
              },
              "sensor_luz_ambiental": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Sensor luz ambiental"
              },
              "sensor_proximidad_tipo": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Sensor proximidad tipo",
                "maxLength": 4000
              },
              "sensor_temperatura": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Sensor temperatura"
              },
              "sensor_profundidad": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Sensor profundidad"
              },
              "otros": {
                "type": "array",
                "title": "Otros",
                "items": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Valor",
                  "maxLength": 4000
                },
                "maxItems": 200
              }
            },
            "additionalProperties": true
          },
          "audio": {
            "type": "object",
            "title": "Audio y vibración",
            "properties": {
              "altavoces_cantidad": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Altavoces cantidad",
                "minimum": 0
              },
              "altavoces_estereo": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Altavoces estereo"
              },
              "microfonos_cantidad": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Microfonos cantidad",
                "minimum": 0
              },
              "formatos_audio_espacial": {
                "type": "array",
                "title": "Formatos audio espacial",
                "items": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Valor",
                  "maxLength": 4000
                },
                "maxItems": 200
              },
              "certificaciones_audio": {
                "type": "array",
                "title": "Certificaciones audio",
                "items": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Valor",
                  "maxLength": 4000
                },
                "maxItems": 200
              },
              "motor_vibracion_tipo": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Motor vibracion tipo",
                "maxLength": 4000
              },
              "notas_audio": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Notas audio",
                "maxLength": 4000
              }
            },
            "additionalProperties": true
          },
          "software": {
            "type": "object",
            "title": "Software y soporte",
            "properties": {
              "sistema_operativo_lanzamiento": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Sistema operativo lanzamiento",
                "maxLength": 4000
              },
              "version_lanzamiento": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Version lanzamiento",
                "maxLength": 4000
              },
              "sistema_operativo_actual": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Sistema operativo actual",
                "maxLength": 4000
              },
              "version_actual": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Version actual",
                "maxLength": 4000
              },
              "capa_personalizacion": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Capa personalizacion",
                "maxLength": 4000
              },
              "version_capa": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Version capa",
                "maxLength": 4000
              },
              "fecha_verificacion_version": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Fecha verificacion version",
                "format": "date"
              },
              "parche_seguridad_fecha": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Parche seguridad fecha",
                "format": "date"
              },
              "actualizaciones_so_prometidas": {
                "type": [
                  "number",
                  "null"
                ],
                "title": "Actualizaciones so prometidas",
                "minimum": 0
              },
              "soporte_seguridad_hasta": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Soporte seguridad hasta",
                "format": "date"
              },
              "frecuencia_parches_declarada": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Frecuencia parches declarada",
                "maxLength": 4000
              },
              "servicios_google": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Servicios google"
              },
              "tienda_principal": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Tienda principal",
                "maxLength": 4000
              },
              "idiomas": {
                "type": "array",
                "title": "Idiomas",
                "items": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Valor",
                  "maxLength": 4000
                },
                "maxItems": 200
              },
              "funciones_ia": {
                "type": "array",
                "title": "Funciones ia",
                "items": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Valor",
                  "maxLength": 4000
                },
                "maxItems": 200
              },
              "restricciones_ia": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Restricciones ia",
                "maxLength": 4000
              },
              "fuente_politica_actualizaciones": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Fuente politica actualizaciones",
                "maxLength": 4000
              }
            },
            "additionalProperties": true
          },
          "seguridad": {
            "type": "object",
            "title": "Seguridad",
            "properties": {
              "lector_huella": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Lector huella"
              },
              "lector_huella_tipo": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Lector huella tipo",
                "maxLength": 4000
              },
              "lector_huella_ubicacion": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Lector huella ubicacion",
                "maxLength": 4000
              },
              "reconocimiento_facial": {
                "type": [
                  "boolean",
                  "null"
                ],
                "title": "Reconocimiento facial"
              },
              "reconocimiento_facial_tipo": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Reconocimiento facial tipo",
                "maxLength": 4000
              },
              "elemento_seguro": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Elemento seguro",
                "maxLength": 4000
              },
              "funciones_antirrobo": {
                "type": "array",
                "title": "Funciones antirrobo",
                "items": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Valor",
                  "maxLength": 4000
                },
                "maxItems": 200
              },
              "notas": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Notas",
                "maxLength": 4000
              }
            },
            "additionalProperties": true
          },
          "pruebas": {
            "type": "array",
            "title": "Pruebas y rendimiento",
            "items": {
              "type": "object",
              "title": "Prueba",
              "properties": {
                "id": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Id",
                  "maxLength": 4000
                },
                "categoria": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Categoria",
                  "maxLength": 4000
                },
                "nombre": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Nombre",
                  "maxLength": 4000
                },
                "version": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Version",
                  "maxLength": 4000
                },
                "fecha": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Fecha",
                  "format": "date"
                },
                "fuente_id": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Fuente id",
                  "maxLength": 4000
                },
                "variante_probada": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Variante probada",
                  "maxLength": 4000
                },
                "version_sistema": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Version sistema",
                  "maxLength": 4000
                },
                "condiciones": {
                  "type": "object",
                  "title": "Condiciones",
                  "properties": {
                    "juego": {
                      "type": [
                        "string",
                        "null"
                      ],
                      "title": "Juego",
                      "maxLength": 4000
                    },
                    "version_juego": {
                      "type": [
                        "string",
                        "null"
                      ],
                      "title": "Version juego",
                      "maxLength": 4000
                    },
                    "resolucion": {
                      "type": [
                        "string",
                        "null"
                      ],
                      "title": "Resolucion",
                      "maxLength": 4000
                    },
                    "calidad_grafica": {
                      "type": [
                        "string",
                        "null"
                      ],
                      "title": "Calidad grafica",
                      "maxLength": 4000
                    },
                    "duracion_min": {
                      "type": [
                        "number",
                        "null"
                      ],
                      "title": "Duracion min",
                      "minimum": 0
                    },
                    "temperatura_ambiente_c": {
                      "type": [
                        "number",
                        "null"
                      ],
                      "title": "Temperatura ambiente c"
                    },
                    "notas": {
                      "type": [
                        "string",
                        "null"
                      ],
                      "title": "Notas",
                      "maxLength": 4000
                    }
                  },
                  "additionalProperties": true
                },
                "resultados": {
                  "type": "object",
                  "title": "Resultados",
                  "properties": {
                    "puntuacion": {
                      "type": [
                        "number",
                        "null"
                      ],
                      "title": "Puntuacion",
                      "minimum": 0
                    },
                    "fps_promedio": {
                      "type": [
                        "number",
                        "null"
                      ],
                      "title": "Fps promedio",
                      "minimum": 0
                    },
                    "fps_1_por_ciento_bajo": {
                      "type": [
                        "number",
                        "null"
                      ],
                      "title": "Fps 1 por ciento bajo",
                      "minimum": 0
                    },
                    "temperatura_superficie_max_c": {
                      "type": [
                        "number",
                        "null"
                      ],
                      "title": "Temperatura superficie max c",
                      "minimum": 0
                    },
                    "consumo_bateria_porcentaje": {
                      "type": [
                        "number",
                        "null"
                      ],
                      "title": "Consumo bateria porcentaje",
                      "minimum": 0,
                      "maximum": 100
                    },
                    "autonomia_horas": {
                      "type": [
                        "number",
                        "null"
                      ],
                      "title": "Autonomia horas",
                      "minimum": 0
                    },
                    "tiempo_carga_min": {
                      "type": [
                        "number",
                        "null"
                      ],
                      "title": "Tiempo carga min",
                      "minimum": 0
                    },
                    "porcentaje_carga_inicial": {
                      "type": [
                        "number",
                        "null"
                      ],
                      "title": "Porcentaje carga inicial",
                      "minimum": 0
                    },
                    "porcentaje_carga_final": {
                      "type": [
                        "number",
                        "null"
                      ],
                      "title": "Porcentaje carga final",
                      "minimum": 0
                    },
                    "notas": {
                      "type": [
                        "string",
                        "null"
                      ],
                      "title": "Notas",
                      "maxLength": 4000
                    },
                    "adicionales": {
                      "type": "object",
                      "title": "Mediciones adicionales (JSON)",
                      "additionalProperties": true,
                      "x-editor": "json"
                    }
                  },
                  "additionalProperties": true
                }
              },
              "additionalProperties": true
            },
            "maxItems": 200
          },
          "ofertas": {
            "type": "array",
            "title": "Ofertas y equipos usados",
            "items": {
              "type": "object",
              "title": "Oferta",
              "properties": {
                "id": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Id",
                  "maxLength": 4000
                },
                "tienda": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Tienda",
                  "maxLength": 4000
                },
                "vendedor": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Vendedor",
                  "maxLength": 4000
                },
                "url": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Url",
                  "maxLength": 4000
                },
                "pais": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Pais",
                  "maxLength": 4000
                },
                "moneda": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Moneda",
                  "maxLength": 4000
                },
                "precio": {
                  "type": [
                    "number",
                    "null"
                  ],
                  "title": "Precio",
                  "minimum": 0
                },
                "costo_envio": {
                  "type": [
                    "number",
                    "null"
                  ],
                  "title": "Costo envio",
                  "minimum": 0
                },
                "impuestos_incluidos": {
                  "type": [
                    "boolean",
                    "null"
                  ],
                  "title": "Impuestos incluidos"
                },
                "condicion": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Condicion",
                  "maxLength": 4000
                },
                "disponibilidad": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Disponibilidad",
                  "maxLength": 4000
                },
                "fecha_consulta": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Fecha consulta",
                  "format": "date"
                },
                "garantia_meses": {
                  "type": [
                    "number",
                    "null"
                  ],
                  "title": "Garantia meses",
                  "minimum": 0
                },
                "garantia_proveedor": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Garantia proveedor",
                  "maxLength": 4000
                },
                "accesorios_incluidos": {
                  "type": "array",
                  "title": "Accesorios incluidos",
                  "items": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "title": "Valor",
                    "maxLength": 4000
                  },
                  "maxItems": 200
                },
                "notas": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Notas",
                  "maxLength": 4000
                },
                "unidad_usada": {
                  "type": "object",
                  "title": "Estado de esta unidad",
                  "properties": {
                    "salud_bateria_porcentaje": {
                      "type": [
                        "number",
                        "null"
                      ],
                      "title": "Salud bateria porcentaje",
                      "minimum": 0,
                      "maximum": 100
                    },
                    "ciclos_bateria": {
                      "type": [
                        "number",
                        "null"
                      ],
                      "title": "Ciclos bateria",
                      "minimum": 0
                    },
                    "estado_estetico": {
                      "type": [
                        "string",
                        "null"
                      ],
                      "title": "Estado estetico",
                      "maxLength": 4000
                    },
                    "fallas_conocidas": {
                      "type": "array",
                      "title": "Fallas conocidas",
                      "items": {
                        "type": [
                          "string",
                          "null"
                        ],
                        "title": "Valor",
                        "maxLength": 4000
                      },
                      "maxItems": 200
                    },
                    "reparaciones_declaradas": {
                      "type": "array",
                      "title": "Reparaciones declaradas",
                      "items": {
                        "type": [
                          "string",
                          "null"
                        ],
                        "title": "Valor",
                        "maxLength": 4000
                      },
                      "maxItems": 200
                    },
                    "piezas_reemplazadas": {
                      "type": "array",
                      "title": "Piezas reemplazadas",
                      "items": {
                        "type": [
                          "string",
                          "null"
                        ],
                        "title": "Valor",
                        "maxLength": 4000
                      },
                      "maxItems": 200
                    },
                    "pruebas_realizadas": {
                      "type": "array",
                      "title": "Pruebas realizadas",
                      "items": {
                        "type": [
                          "string",
                          "null"
                        ],
                        "title": "Valor",
                        "maxLength": 4000
                      },
                      "maxItems": 200
                    }
                  },
                  "additionalProperties": true
                }
              },
              "additionalProperties": true
            },
            "maxItems": 200
          },
          "multimedia": {
            "type": "object",
            "title": "Imágenes y recursos",
            "properties": {
              "imagen_principal": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Imagen principal",
                "maxLength": 1000000
              },
              "videos": {
                "type": "array",
                "title": "Videos",
                "items": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Valor",
                  "maxLength": 4000
                },
                "maxItems": 200
              },
              "pagina_oficial": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Pagina oficial",
                "maxLength": 4000
              },
              "manual_url": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Manual url",
                "maxLength": 4000
              },
              "soporte_url": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Soporte url",
                "maxLength": 4000
              },
              "galeria": {
                "type": "array",
                "title": "Galería",
                "items": {
                  "type": "object",
                  "title": "Imagen",
                  "properties": {
                    "url": {
                      "type": [
                        "string",
                        "null"
                      ],
                      "title": "Url",
                      "maxLength": 1000000
                    },
                    "texto_alternativo": {
                      "type": [
                        "string",
                        "null"
                      ],
                      "title": "Texto alternativo",
                      "maxLength": 4000
                    },
                    "vista": {
                      "type": [
                        "string",
                        "null"
                      ],
                      "title": "Vista",
                      "maxLength": 4000
                    },
                    "color": {
                      "type": [
                        "string",
                        "null"
                      ],
                      "title": "Color",
                      "maxLength": 4000
                    },
                    "fuente_id": {
                      "type": [
                        "string",
                        "null"
                      ],
                      "title": "Fuente id",
                      "maxLength": 4000
                    },
                    "autor": {
                      "type": [
                        "string",
                        "null"
                      ],
                      "title": "Autor",
                      "maxLength": 4000
                    },
                    "licencia": {
                      "type": [
                        "string",
                        "null"
                      ],
                      "title": "Licencia",
                      "maxLength": 4000
                    }
                  },
                  "additionalProperties": true
                },
                "maxItems": 200
              }
            },
            "additionalProperties": true
          },
          "fuentes": {
            "type": "array",
            "title": "Fuentes de información",
            "items": {
              "type": "object",
              "title": "Fuente",
              "properties": {
                "id": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Id",
                  "maxLength": 4000
                },
                "titulo": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Titulo",
                  "maxLength": 4000
                },
                "url": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Url",
                  "maxLength": 4000
                },
                "editor": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Editor",
                  "maxLength": 4000
                },
                "tipo": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Tipo",
                  "maxLength": 4000
                },
                "fecha_publicacion": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Fecha publicacion",
                  "format": "date"
                },
                "fecha_consulta": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Fecha consulta",
                  "format": "date"
                },
                "region": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Region",
                  "maxLength": 4000
                },
                "campos_respaldados": {
                  "type": "array",
                  "title": "Campos respaldados",
                  "items": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "title": "Valor",
                    "maxLength": 4000
                  },
                  "maxItems": 200
                },
                "notas": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Notas",
                  "maxLength": 4000
                }
              },
              "additionalProperties": true
            },
            "maxItems": 200
          },
          "metadatos": {
            "type": "object",
            "title": "Calidad de información",
            "properties": {
              "fecha_creacion": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Fecha creacion",
                "format": "date"
              },
              "fecha_actualizacion": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Fecha actualizacion",
                "format": "date"
              },
              "campos_pendientes": {
                "type": "array",
                "title": "Campos pendientes",
                "items": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Valor",
                  "maxLength": 4000
                },
                "maxItems": 200
              },
              "campos_en_conflicto": {
                "type": "array",
                "title": "Campos en conflicto",
                "items": {
                  "type": [
                    "string",
                    "null"
                  ],
                  "title": "Valor",
                  "maxLength": 4000
                },
                "maxItems": 200
              },
              "observaciones": {
                "type": [
                  "string",
                  "null"
                ],
                "title": "Observaciones",
                "maxLength": 4000
              }
            },
            "additionalProperties": true
          }
        },
        "additionalProperties": true,
        "required": [
          "id",
          "nombre"
        ]
      },
      "maxItems": 2000
    },
    "preferencias": {
      "type": "object",
      "properties": {
        "celulares_favoritos": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "uniqueItems": true
        },
        "notas_por_celular": {
          "type": "object",
          "additionalProperties": {
            "type": "string"
          }
        },
        "etiquetas_por_celular": {
          "type": "object",
          "additionalProperties": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      },
      "additionalProperties": true
    },
    "comparativas": {
      "type": "array",
      "items": {
        "type": "object",
        "title": "Comparativa",
        "properties": {
          "id": {
            "type": "string",
            "title": "ID permanente",
            "minLength": 1,
            "maxLength": 160,
            "pattern": "^[A-Za-z0-9_-]+$"
          },
          "nombre": {
            "type": "string",
            "title": "Nombre para mostrar",
            "minLength": 1,
            "maxLength": 160
          },
          "celulares_ids": {
            "type": "array",
            "title": "Celulares ids",
            "items": {
              "type": "string"
            },
            "maxItems": 200,
            "uniqueItems": true,
            "minItems": 2
          },
          "atributos_visibles": {
            "type": "array",
            "title": "Atributos visibles",
            "items": {
              "type": [
                "string",
                "null"
              ],
              "title": "Valor",
              "maxLength": 4000
            },
            "maxItems": 5000
          },
          "favorita": {
            "type": [
              "boolean",
              "null"
            ],
            "title": "Favorita"
          },
          "notas": {
            "type": [
              "string",
              "null"
            ],
            "title": "Notas",
            "maxLength": 4000
          }
        },
        "additionalProperties": true,
        "required": [
          "id",
          "nombre",
          "celulares_ids"
        ]
      },
      "maxItems": 1000
    }
  },
  "additionalProperties": true
};
export const phoneSchema = catalogSchema.properties.celulares.items;
