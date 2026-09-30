import { DtcSearchResult, VehicleProfile } from '../types';
import { getDtcGuide } from '../data/dtcGuide';

// In-memory cache for fast lookups
const searchCache = new Map<string, DtcSearchResult>();

export async function lookupDtcWithGoogleSearch(
  code: string,
  vehicle?: VehicleProfile
): Promise<DtcSearchResult> {
  const cleanCode = code.trim().toUpperCase();
  const cacheKey = `${cleanCode}_${vehicle?.id || 'default'}`;

  if (searchCache.has(cacheKey)) {
    return searchCache.get(cacheKey)!;
  }

  try {
    const response = await fetch('/api/dtc/lookup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: cleanCode,
        vehicle: vehicle
          ? {
              make: vehicle.make,
              model: vehicle.model,
              year: vehicle.year,
              engine: vehicle.engine,
              fuelType: vehicle.fuelType,
            }
          : undefined,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data: DtcSearchResult = await response.json();
    searchCache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.warn('Failed to fetch from /api/dtc/lookup, using offline guide fallback:', error);
    
    // Offline local database fallback
    const localGuide = getDtcGuide(cleanCode);
    const fallbackResult: DtcSearchResult = {
      code: cleanCode,
      vehicleContext: vehicle ? `${vehicle.make} ${vehicle.model} (${vehicle.year})` : undefined,
      title: localGuide.title,
      summary: `Diagnóstico baseado na base de dados técnica interna. Falha no sistema de ${localGuide.system}.`,
      technicalDescription: `Código ${cleanCode}: ${localGuide.title}. Risco de condução: ${localGuide.drivingRisk}`,
      symptoms: localGuide.symptoms,
      commonCauses: localGuide.probableCauses,
      recommendedFixes: localGuide.maintenanceActions,
      mechanicTips: [
        `Dificuldade estimada de reparo: ${localGuide.estimatedRepairDifficulty}.`,
        'Utilize scanner OBD2 com leitura de parâmetros em tempo real (Modo 01) para confirmar o diagnóstico antes de trocar sensores.',
      ],
      urgencyLevel: localGuide.severity === 'critica' ? 'alta' : localGuide.severity === 'leve' ? 'baixa' : 'moderada',
      sources: [
        {
          title: 'Manual Técnico Automotivo OBD2',
          uri: 'https://www.obd-codes.com',
        },
      ],
      searchedAt: new Date().toISOString(),
      isAiGrounded: false,
      note: 'Sem conexão ativa com o servidor de busca. Exibindo diagnóstico técnico offline.',
    };

    searchCache.set(cacheKey, fallbackResult);
    return fallbackResult;
  }
}

export function clearDtcSearchCache(): void {
  searchCache.clear();
}
