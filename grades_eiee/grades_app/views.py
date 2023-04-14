from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import SCC
import json


class SCCView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if (id > 0):
            sccs = list(SCC.objects.filter(id=id).values())
            if (len(sccs) > 0):
                scc = sccs[0]
                datos = {'message': 'Success', 'scc': scc}
            else:
                datos = {'message': 'SCC not found!'}
            return JsonResponse(datos)
        else:
            sccs = list(SCC.objects.values())
            if len(sccs) > 0:
                datos = {'sccs': sccs}
            else:
                datos = {'message': 'SCCs not found'}
            return JsonResponse(datos)

    @method_decorator(csrf_exempt)
    def post(self, request):
        jd = json.loads(request.body)
        datos = {'message': 'Success'}
        try:
            SCC.objects.create(id=jd['id'], nombre=jd['nombre'], descripcion=jd['descripcion'])
        except Exception as e:
            print("Falló la inserción")
            datos = {'message': 'Fail'}
            return JsonResponse(datos)

        return SCCView.as_view()(self.request)

    @method_decorator(csrf_exempt)
    def put(self, request):
        jd = json.loads(request.body)
        datos = {'message': 'Success'}
        try:
            scc = SCC.objects.get(id=jd['id'])
            scc.nombre = jd['nombre']
            scc.descripcion = jd['descripcion']
            scc.save()
        except SCC.DoesNotExist:
            print("El objeto SCC no existe")
            datos = {'message': 'SCC does not exist'}
            return JsonResponse(datos)
        except Exception as e:
            print("Falló la actualización")
            datos = {'message': 'Fail'}
            return JsonResponse(datos)

        return SCCView.as_view()(self.request)

    @method_decorator(csrf_exempt)
    def delete(self, request, id):
        datos = {'message': 'Success'}
        try:
            scc = SCC.objects.get(id=id)
            scc.delete()
        except SCC.DoesNotExist:
            print("El objeto SCC no existe")
            datos = {'message': 'SCC does not exist'}
            return JsonResponse(datos)
        except Exception as e:
            print("Falló la eliminación")
            datos = {'message': 'Fail'}
            return JsonResponse(datos)

        return JsonResponse(datos)