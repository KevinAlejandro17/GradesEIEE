from django.db import models

class Usuario(models.Model):
    PROFESOR = 'PROFESOR'
    ADMINISTRADOR = 'ADMINISTRADOR'
    TIPOS_USUARIO = [
        (PROFESOR, 'Profesor'),
        (ADMINISTRADOR, 'Administrador'),
    ]
    nombre = models.CharField(max_length=255)
    apellido = models.CharField(max_length=255)
    correo_electronico = models.EmailField()
    tipo = models.CharField(max_length=20, choices=TIPOS_USUARIO)

class Curso(models.Model):
    codigo = models.CharField(max_length=20)
    periodo_semestral = models.CharField(max_length=20)
    resultados_de_aprendizaje = models.ManyToManyField('ResultadoDeAprendizaje')

class Estudiante(models.Model):
    codigo_estudiantil = models.CharField(max_length=20)
    nombre = models.CharField(max_length=255)
    apellido = models.CharField(max_length=255)

class Inscripcion(models.Model):
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE)
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)

class Actividad(models.Model):
    nombre = models.CharField(max_length=255)
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    resultado_de_aprendizaje = models.ForeignKey('ResultadoDeAprendizaje', on_delete=models.CASCADE)

class Nota(models.Model):
    valor = models.DecimalField(max_digits=5, decimal_places=2)
    actividad = models.ForeignKey(Actividad, on_delete=models.CASCADE)
    inscripcion = models.ForeignKey(Inscripcion, on_delete=models.CASCADE)

class ResultadoDeAprendizaje(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    scc = models.ForeignKey('SCC', on_delete=models.CASCADE)

class SCC(models.Model):
    id = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()

class IndicadorDeLogro(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    resultado_de_aprendizaje = models.ForeignKey(ResultadoDeAprendizaje, on_delete=models.CASCADE)