import { Injectable } from '@angular/core';
import { Http, Response, Jsonp } from '@angular/http';
import { Toll } from '../../model/toll';
import { Region } from '../../model/region';
import { Road } from '../../model/road';
import { Park } from '../../model/park';
import { Place } from '../../model/place';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class MonitorService {

  constructor(private http: Http, private jsonp: Jsonp) {
  }

  getSingleParkMapCenterPonit() {
    return [117.017671, 28.210813];
  }

  getMapCenterPonit() {
    return [117.026695, 36.671138];
  }

  getRegionCenterPonit() {
    return [117.026695, 36.671138];
  }

  getRoadCenterPonit() {
    return [117.091809, 36.664026];
  }

  getParkCenterPonit() {
    return [117.129968, 36.673113];
  }

  getPointers() {
    let polygonArr = []; // 多边形覆盖物节点坐标数组
    polygonArr.push([117.045255, 36.685715]);
    polygonArr.push([117.048313, 36.686486]);
    polygonArr.push([117.045098, 36.685371]);
    return polygonArr;
  }

  getMarks() {
    return [
      {
        'lng': 117.046322,
        'lat': 36.672221,
        'count': 49
      },
      {
        'lng': 117.046316,
        'lat': 36.677939,
        'count': 29
      },
      {
        'lng': 117.033205,
        'lat': 36.664715,
        'count': 83
      },
      {
        'lng': 117.023131,
        'lat': 36.664349,
        'count': 13
      },
      {
        'lng': 117.022943,
        'lat': 36.670193,
        'count': 22
      },
      {
        'lng': 117.031581,
        'lat': 36.671266,
        'count': 248
      },
      {
        'lng': 117.041788,
        'lat': 36.686047,
        'count': 58
      },
      {
        'lng': 117.035855,
        'lat': 36.66306,
        'count': 135
      },
      {
        'lng': 117.039308,
        'lat': 36.667178,
        'count': 48
      },
      {
        'lng': 117.045422,
        'lat': 36.651701,
        'count': 63
      },
      {
        'lng': 117.042232,
        'lat': 36.664517,
        'count': 43
      },
      {
        'lng': 117.035667,
        'lat': 36.663831,
        'count': 14
      },
      {
        'lng': 117.041402,
        'lat': 36.666914,
        'count': 17
      },
      {
        'lng': 117.042943,
        'lat': 36.653036,
        'count': 22
      },
      {
        'lng': 117.093231,
        'lat': 36.668266,
        'count': 22
      },
      {
        'lng': 117.086429,
        'lat': 36.660575,
        'count': 103
      },
      {
        'lng': 117.08673,
        'lat': 36.683176,
        'count': 66
      },
      {
        'lng': 117.056228,
        'lat': 36.671357,
        'count': 185
      },
      {
        'lng': 117.058826,
        'lat': 36.675396,
        'count': 55
      },
      {
        'lng': 117.059786,
        'lat': 36.691734,
        'count': 32
      },
      {
        'lng': 117.057417,
        'lat': 36.677679,
        'count': 76
      },
      {
        'lng': 117.12114,
        'lat': 36.66872,
        'count': 69
      },
      {
        'lng': 117.123561,
        'lat': 36.668343,
        'count': 64
      },
      {
        'lng': 117.104225,
        'lat': 36.656388,
        'count': 38
      },
      {
        'lng': 117.123547,
        'lat': 36.670425,
        'count': 40
      },
      {
        'lng': 117.121737,
        'lat': 36.666682,
        'count': 58
      },
      {
        'lng': 117.098418,
        'lat': 36.650604,
        'count': 73
      },
      {
        'lng': 117.099761,
        'lat': 36.652642,
        'count': 33
      },
      {
        'lng': 117.100691,
        'lat': 36.656424,
        'count': 35
      },
      {
        'lng': 117.128932,
        'lat': 36.649539,
        'count': 56
      },
      {
        'lng': 117.034796,
        'lat': 36.674566,
        'count': 164
      },
      {
        'lng': 117.036804,
        'lat': 36.675609,
        'count': 34
      },
      {
        'lng': 117.039636,
        'lat': 36.676948,
        'count': 153
      },
      {
        'lng': 117.031538,
        'lat': 36.672155,
        'count': 20
      },
      {
        'lng': 117.03997,
        'lat': 36.6694,
        'count': 29
      },
      {
        'lng': 117.032989,
        'lat': 36.672296,
        'count': 18
      },
      {
        'lng': 117.024432,
        'lat': 36.669795,
        'count': 25
      },
      {
        'lng': 117.025304,
        'lat': 36.669568,
        'count': 25
      },
      {
        'lng': 117.026855,
        'lat': 36.673459,
        'count': 43
      },
      {
        'lng': 117.023449,
        'lat': 36.671638,
        'count': 35
      },
      {
        'lng': 117.032791,
        'lat': 36.66965,
        'count': 45
      },
      {
        'lng': 117.026376,
        'lat': 36.669679,
        'count': 28
      },
      {
        'lng': 117.027962,
        'lat': 36.67405,
        'count': 17
      },
      {
        'lng': 117.026274,
        'lat': 36.673943,
        'count': 9
      },
      {
        'lng': 117.027218,
        'lat': 36.672525,
        'count': 95
      },
      {
        'lng': 117.051409,
        'lat': 36.658687,
        'count': 318
      },
      {
        'lng': 117.056733,
        'lat': 36.649616,
        'count': 173
      },
      {
        'lng': 117.057854,
        'lat': 36.661824,
        'count': 38
      },
      {
        'lng': 117.062238,
        'lat': 36.650967,
        'count': 31
      },
      {
        'lng': 117.05553,
        'lat': 36.640893,
        'count': 79
      },
      {
        'lng': 117.067512,
        'lat': 36.675255,
        'count': 55
      },
      {
        'lng': 117.068084,
        'lat': 36.658403,
        'count': 28
      },
      {
        'lng': 117.069268,
        'lat': 36.665985,
        'count': 49
      },
      {
        'lng': 117.024024,
        'lat': 36.632235,
        'count': 99
      },
      {
        'lng': 117.019788,
        'lat': 36.632599,
        'count': 86
      },
      {
        'lng': 117.016389,
        'lat': 36.651506,
        'count': 13
      },
      {
        'lng': 117.016343,
        'lat': 36.651,
        'count': 20
      },
      {
        'lng': 117.01081,
        'lat': 36.650985,
        'count': 53
      },
      {
        'lng': 117.012973,
        'lat': 36.650977,
        'count': 54
      },
      {
        'lng': 117.011223,
        'lat': 36.651984,
        'count': 98
      },
      {
        'lng': 117.014223,
        'lat': 36.651999,
        'count': 45
      },
      {
        'lng': 117.004494,
        'lat': 36.654273,
        'count': 20
      },
      {
        'lng': 117.004494,
        'lat': 36.655634,
        'count': 20
      },
      {
        'lng': 117.002554,
        'lat': 36.654273,
        'count': 20
      },
      {
        'lng': 117.002698,
        'lat': 36.655692,
        'count': 20
      },
      {
        'lng': 116.99359,
        'lat': 36.649601,
        'count': 20
      },
      {
        'lng': 116.996456,
        'lat': 36.649564,
        'count': 32
      },
      {
        'lng': 117.005909,
        'lat': 36.650557,
        'count': 25
      },
      {
        'lng': 117.005999,
        'lat': 36.653517,
        'count': 38
      },
      {
        'lng': 116.996356,
        'lat': 36.665126,
        'count': 84
      },
      {
        'lng': 117.002662,
        'lat': 36.666078,
        'count': 10
      },
      {
        'lng': 117.002069,
        'lat': 36.666096,
        'count': 11
      },
      {
        'lng': 116.996473,
        'lat': 36.660337,
        'count': 8
      },
      {
        'lng': 116.996509,
        'lat': 36.659034,
        'count': 29
      },
      {
        'lng': 117.002294,
        'lat': 36.66989,
        'count': 46
      },
      {
        'lng': 117.000202,
        'lat': 36.664117,
        'count': 70
      },
      {
        'lng': 116.996926,
        'lat': 36.664936,
        'count': 38
      },
      {
        'lng': 116.999695,
        'lat': 36.668821,
        'count': 62
      },
      {
        'lng': 116.997227,
        'lat': 36.670211,
        'count': 115
      },
      {
        'lng': 117.005891,
        'lat': 36.665926,
        'count': 35
      },
      {
        'lng': 117.005716,
        'lat': 36.666491,
        'count': 35
      },
      {
        'lng': 117.008568,
        'lat': 36.660799,
        'count': 25
      },
      {
        'lng': 117.008519,
        'lat': 36.660339,
        'count': 25
      },
      {
        'lng': 117.003882,
        'lat': 36.662473,
        'count': 62
      },
      {
        'lng': 117.006749,
        'lat': 36.65666,
        'count': 38
      },
      {
        'lng': 117.009958,
        'lat': 36.660212,
        'count': 26
      },
      {
        'lng': 116.994627,
        'lat': 36.659485,
        'count': 30
      },
      {
        'lng': 117.014456,
        'lat': 36.656627,
        'count': 16
      },
      {
        'lng': 117.007521,
        'lat': 36.662414,
        'count': 7
      },
      {
        'lng': 116.999123,
        'lat': 36.661249,
        'count': 28
      },
      {
        'lng': 116.999015,
        'lat': 36.659809,
        'count': 11
      },
      {
        'lng': 117.005756,
        'lat': 36.67532,
        'count': 8
      },
      {
        'lng': 117.012764,
        'lat': 36.667466,
        'count': 36
      },
      {
        'lng': 117.010984,
        'lat': 36.667154,
        'count': 88
      },
      {
        'lng': 117.010633,
        'lat': 36.673013,
        'count': 26
      },
      {
        'lng': 117.008134,
        'lat': 36.66661,
        'count': 72
      },
      {
        'lng': 117.004702,
        'lat': 36.674979,
        'count': 20
      },
      {
        'lng': 117.013715,
        'lat': 36.661616,
        'count': 32
      },
      {
        'lng': 117.013751,
        'lat': 36.659416,
        'count': 32
      },
      {
        'lng': 117.013895,
        'lat': 36.657302,
        'count': 25
      },
      {
        'lng': 117.013715,
        'lat': 36.656405,
        'count': 25
      },
      {
        'lng': 117.020176,
        'lat': 36.659825,
        'count': 20
      },
      {
        'lng': 117.018222,
        'lat': 36.661648,
        'count': 32
      },
      {
        'lng': 117.018345,
        'lat': 36.657095,
        'count': 22
      },
      {
        'lng': 117.005426,
        'lat': 36.638598,
        'count': 26
      },
      {
        'lng': 117.006569,
        'lat': 36.636969,
        'count': 32
      },
      {
        'lng': 117.001858,
        'lat': 36.664798,
        'count': 22
      },
      {
        'lng': 116.96785,
        'lat': 36.640978,
        'count': 27
      },
      {
        'lng': 116.973517,
        'lat': 36.638279,
        'count': 68
      },
      {
        'lng': 116.969966,
        'lat': 36.636968,
        'count': 15
      },
      {
        'lng': 116.974536,
        'lat': 36.638272,
        'count': 76
      },
      {
        'lng': 116.968546,
        'lat': 36.640986,
        'count': 18
      },
      {
        'lng': 117.013162,
        'lat': 36.609478,
        'count': 80
      },
      {
        'lng': 117.006703,
        'lat': 36.610369,
        'count': 25
      },
      {
        'lng': 117.000812,
        'lat': 36.642918,
        'count': 39
      },
      {
        'lng': 116.973449,
        'lat': 36.658162,
        'count': 45
      },
      {
        'lng': 116.973377,
        'lat': 36.656367,
        'count': 53
      },
      {
        'lng': 116.975214,
        'lat': 36.661464,
        'count': 42
      },
      {
        'lng': 116.974141,
        'lat': 36.660713,
        'count': 40
      },
      {
        'lng': 116.952941,
        'lat': 36.6652,
        'count': 30
      },
      {
        'lng': 116.95326,
        'lat': 36.666261,
        'count': 26
      },
      {
        'lng': 116.948436,
        'lat': 36.661041,
        'count': 36
      },
      {
        'lng': 116.951949,
        'lat': 36.68135,
        'count': 90
      },
      {
        'lng': 116.959989,
        'lat': 36.681459,
        'count': 96
      },
      {
        'lng': 116.863154,
        'lat': 36.647755,
        'count': 110
      },
      {
        'lng': 116.854126,
        'lat': 36.642594,
        'count': 106
      },
      {
        'lng': 116.941353,
        'lat': 36.710628,
        'count': 86
      },
      {
        'lng': 116.94695,
        'lat': 36.71053,
        'count': 90
      },
      {
        'lng': 116.96859,
        'lat': 36.650544,
        'count': 52
      },
      {
        'lng': 116.971644,
        'lat': 36.652505,
        'count': 45
      },
      {
        'lng': 116.970359,
        'lat': 36.65202,
        'count': 41
      },
      {
        'lng': 116.967763,
        'lat': 36.650334,
        'count': 48
      },
      {
        'lng': 116.969169,
        'lat': 36.652606,
        'count': 18
      },
      {
        'lng': 116.993135,
        'lat': 36.662829,
        'count': 21
      },
      {
        'lng': 116.98753,
        'lat': 36.661613,
        'count': 99
      },
      {
        'lng': 116.984894,
        'lat': 36.661086,
        'count': 46
      },
      {
        'lng': 116.987009,
        'lat': 36.663278,
        'count': 89
      },
      {
        'lng': 116.992524,
        'lat': 36.664363,
        'count': 24
      },
      {
        'lng': 116.984979,
        'lat': 36.662829,
        'count': 55
      },
      {
        'lng': 116.990185,
        'lat': 36.670628,
        'count': 20
      },
      {
        'lng': 116.989933,
        'lat': 36.669297,
        'count': 20
      },
      {
        'lng': 116.988487,
        'lat': 36.66786,
        'count': 90
      },
      {
        'lng': 116.992902,
        'lat': 36.667462,
        'count': 48
      },
      {
        'lng': 116.993495,
        'lat': 36.664964,
        'count': 63
      },
      {
        'lng': 116.980573,
        'lat': 36.666828,
        'count': 44
      },
      {
        'lng': 116.9828,
        'lat': 36.667204,
        'count': 64
      },
      {
        'lng': 116.983506,
        'lat': 36.665899,
        'count': 68
      },
      {
        'lng': 116.986367,
        'lat': 36.666528,
        'count': 74
      },
      {
        'lng': 116.985792,
        'lat': 36.660594,
        'count': 131
      },
      {
        'lng': 116.970853,
        'lat': 36.65744,
        'count': 59
      },
      {
        'lng': 116.963123,
        'lat': 36.657873,
        'count': 35
      },
      {
        'lng': 116.987606,
        'lat': 36.657129,
        'count': 54
      },
      {
        'lng': 116.982639,
        'lat': 36.661712,
        'count': 35
      },
      {
        'lng': 116.977325,
        'lat': 36.65781,
        'count': 40
      },
      {
        'lng': 117.006156,
        'lat': 36.689174,
        'count': 65
      },
      {
        'lng': 117.012235,
        'lat': 36.685714,
        'count': 108
      },
      {
        'lng': 117.002006,
        'lat': 36.67742,
        'count': 14
      },
      {
        'lng': 117.002848,
        'lat': 36.677384,
        'count': 20
      },
      {
        'lng': 117.016833,
        'lat': 36.678722,
        'count': 23
      },
      {
        'lng': 117.013765,
        'lat': 36.68882,
        'count': 12
      },
      {
        'lng': 117.02411,
        'lat': 36.68656,
        'count': 52
      },
      {
        'lng': 117.019977,
        'lat': 36.686122,
        'count': 76
      },
      {
        'lng': 117.021711,
        'lat': 36.673953,
        'count': 37
      },
      {
        'lng': 117.018882,
        'lat': 36.671246,
        'count': 13
      },
      {
        'lng': 117.022247,
        'lat': 36.679906,
        'count': 30
      },
      {
        'lng': 117.019615,
        'lat': 36.673359,
        'count': 43
      },
      {
        'lng': 117.017926,
        'lat': 36.672031,
        'count': 25
      },
      {
        'lng': 117.022232,
        'lat': 36.676233,
        'count': 51
      },
      {
        'lng': 117.016217,
        'lat': 36.677239,
        'count': 155
      },
      {
        'lng': 117.023167,
        'lat': 36.682245,
        'count': 37
      },
      {
        'lng': 117.005941,
        'lat': 36.688067,
        'count': 57
      },
      {
        'lng': 116.998351,
        'lat': 36.688638,
        'count': 35
      },
      {
        'lng': 117.000425,
        'lat': 36.6873,
        'count': 30
      },
      {
        'lng': 117.045908,
        'lat': 36.697807,
        'count': 73
      },
      {
        'lng': 117.04041,
        'lat': 36.699602,
        'count': 488
      },
      {
        'lng': 117.026043,
        'lat': 36.697224,
        'count': 305
      },
      {
        'lng': 117.043776,
        'lat': 36.69308,
        'count': 80
      },
      {
        'lng': 117.005428,
        'lat': 36.706683,
        'count': 51
      },
      {
        'lng': 117.041819,
        'lat': 36.702353,
        'count': 106
      },
      {
        'lng': 117.011379,
        'lat': 36.696342,
        'count': 61
      },
      {
        'lng': 117.021685,
        'lat': 36.692786,
        'count': 38
      },
      {
        'lng': 117.018974,
        'lat': 36.698179,
        'count': 129
      },
      {
        'lng': 116.969388,
        'lat': 36.686228,
        'count': 167
      },
      {
        'lng': 116.980283,
        'lat': 36.69116,
        'count': 76
      },
      {
        'lng': 116.983085,
        'lat': 36.683778,
        'count': 51
      },
      {
        'lng': 116.980469,
        'lat': 36.689615,
        'count': 59
      },
      {
        'lng': 116.979363,
        'lat': 36.696595,
        'count': 60
      },
      {
        'lng': 116.982174,
        'lat': 36.682393,
        'count': 32
      },
      {
        'lng': 116.96351,
        'lat': 36.687083,
        'count': 45
      },
      {
        'lng': 116.973922,
        'lat': 36.674741,
        'count': 32
      },
      {
        'lng': 116.989273,
        'lat': 36.681645,
        'count': 38
      },
      {
        'lng': 116.99391,
        'lat': 36.682686,
        'count': 137
      },
      {
        'lng': 116.985835,
        'lat': 36.679205,
        'count': 197
      },
      {
        'lng': 116.984561,
        'lat': 36.686026,
        'count': 90
      },
      {
        'lng': 116.990391,
        'lat': 36.688378,
        'count': 146
      },
      {
        'lng': 116.989802,
        'lat': 36.689839,
        'count': 55
      },
      {
        'lng': 117.003888,
        'lat': 36.694687,
        'count': 47
      },
      {
        'lng': 116.997888,
        'lat': 36.698829,
        'count': 165
      },
      {
        'lng': 117.00382,
        'lat': 36.701062,
        'count': 49
      },
      {
        'lng': 117.000532,
        'lat': 36.697003,
        'count': 105
      },
      {
        'lng': 117.002848,
        'lat': 36.712953,
        'count': 114
      },
      {
        'lng': 116.991856,
        'lat': 36.717963,
        'count': 85
      },
      {
        'lng': 116.995103,
        'lat': 36.699186,
        'count': 69
      },
      {
        'lng': 117.003865,
        'lat': 36.70108,
        'count': 30
      },
      {
        'lng': 116.959047,
        'lat': 36.72556,
        'count': 346
      },
      {
        'lng': 117.079655,
        'lat': 36.68308,
        'count': 17
      },
      {
        'lng': 117.067986,
        'lat': 36.687766,
        'count': 43
      },
      {
        'lng': 117.074258,
        'lat': 36.674357,
        'count': 28
      },
      {
        'lng': 117.077097,
        'lat': 36.673981,
        'count': 18
      },
      {
        'lng': 117.066163,
        'lat': 36.677546,
        'count': 104
      },
      {
        'lng': 117.074194,
        'lat': 36.677582,
        'count': 79
      },
      {
        'lng': 117.067008,
        'lat': 36.688631,
        'count': 119
      },
      {
        'lng': 117.0728,
        'lat': 36.688674,
        'count': 20
      },
      {
        'lng': 117.071634,
        'lat': 36.693502,
        'count': 72
      },
      {
        'lng': 117.070586,
        'lat': 36.691076,
        'count': 25
      },
      {
        'lng': 117.068526,
        'lat': 36.694079,
        'count': 36
      },
      {
        'lng': 117.068086,
        'lat': 36.686291,
        'count': 23
      },
      {
        'lng': 117.064127,
        'lat': 36.688272,
        'count': 39
      },
      {
        'lng': 117.064368,
        'lat': 36.691137,
        'count': 86
      },
      {
        'lng': 117.068195,
        'lat': 36.691528,
        'count': 63
      },
      {
        'lng': 117.0699,
        'lat': 36.692531,
        'count': 34
      },
      {
        'lng': 117.104773,
        'lat': 36.700939,
        'count': 116
      },
      {
        'lng': 117.104558,
        'lat': 36.70627,
        'count': 116
      },
      {
        'lng': 117.092053,
        'lat': 36.68948,
        'count': 86
      },
      {
        'lng': 117.091622,
        'lat': 36.692663,
        'count': 82
      },
      {
        'lng': 117.089861,
        'lat': 36.700865,
        'count': 68
      },
      {
        'lng': 117.090473,
        'lat': 36.698256,
        'count': 92
      },
      {
        'lng': 117.085549,
        'lat': 36.691438,
        'count': 85
      },
      {
        'lng': 117.086231,
        'lat': 36.689731,
        'count': 53
      },
      {
        'lng': 117.084663,
        'lat': 36.694906,
        'count': 40
      },
      {
        'lng': 117.084717,
        'lat': 36.698277,
        'count': 44
      },
      {
        'lng': 117.081991,
        'lat': 36.696879,
        'count': 101
      },
      {
        'lng': 117.082135,
        'lat': 36.694245,
        'count': 98
      },
      {
        'lng': 117.081423,
        'lat': 36.6824,
        'count': 49
      },
      {
        'lng': 117.084334,
        'lat': 36.682356,
        'count': 48
      },
      {
        'lng': 117.083925,
        'lat': 36.686716,
        'count': 183
      },
      {
        'lng': 117.090153,
        'lat': 36.690658,
        'count': 79
      },
      {
        'lng': 117.096064,
        'lat': 36.690933,
        'count': 27
      },
      {
        'lng': 117.08695,
        'lat': 36.693478,
        'count': 114
      },
      {
        'lng': 117.08946,
        'lat': 36.694315,
        'count': 128
      },
      {
        'lng': 117.093285,
        'lat': 36.700823,
        'count': 130
      },
      {
        'lng': 117.100759,
        'lat': 36.701865,
        'count': 92
      },
      {
        'lng': 117.080467,
        'lat': 36.715953,
        'count': 49
      },
      {
        'lng': 117.081482,
        'lat': 36.714427,
        'count': 48
      },
      {
        'lng': 117.069392,
        'lat': 36.701286,
        'count': 87
      },
      {
        'lng': 117.063184,
        'lat': 36.700085,
        'count': 86
      },
      {
        'lng': 117.077835,
        'lat': 36.706204,
        'count': 56
      },
      {
        'lng': 117.081716,
        'lat': 36.70849,
        'count': 57
      },
      {
        'lng': 117.062106,
        'lat': 36.702299,
        'count': 51
      },
      {
        'lng': 117.080172,
        'lat': 36.712921,
        'count': 37
      },
      {
        'lng': 117.049112,
        'lat': 36.726768,
        'count': 82
      },
      {
        'lng': 117.046969,
        'lat': 36.726204,
        'count': 83
      },
      {
        'lng': 117.149328,
        'lat': 36.669803,
        'count': 32
      },
      {
        'lng': 117.148682,
        'lat': 36.670411,
        'count': 28
      },
      {
        'lng': 117.133394,
        'lat': 36.687809,
        'count': 32
      },
      {
        'lng': 117.135999,
        'lat': 36.684596,
        'count': 58
      },
      {
        'lng': 117.136269,
        'lat': 36.684495,
        'count': 60
      },
      {
        'lng': 117.134257,
        'lat': 36.687027,
        'count': 33
      },
      {
        'lng': 117.130998,
        'lat': 36.691941,
        'count': 75
      },
      {
        'lng': 117.12984,
        'lat': 36.691398,
        'count': 92
      },
      {
        'lng': 117.137597,
        'lat': 36.679985,
        'count': 44
      },
      {
        'lng': 117.137561,
        'lat': 36.678595,
        'count': 36
      },
      {
        'lng': 117.134379,
        'lat': 36.679191,
        'count': 33
      },
      {
        'lng': 117.135529,
        'lat': 36.67833,
        'count': 31
      },
      {
        'lng': 117.123007,
        'lat': 36.686625,
        'count': 41
      },
      {
        'lng': 117.126348,
        'lat': 36.687392,
        'count': 57
      },
      {
        'lng': 117.126431,
        'lat': 36.695773,
        'count': 112
      },
      {
        'lng': 117.132989,
        'lat': 36.696034,
        'count': 109
      },
      {
        'lng': 117.133393,
        'lat': 36.700056,
        'count': 105
      },
      {
        'lng': 117.135614,
        'lat': 36.698616,
        'count': 84
      },
      {
        'lng': 117.140653,
        'lat': 36.666465,
        'count': 30
      },
      {
        'lng': 117.140716,
        'lat': 36.667782,
        'count': 26
      },
      {
        'lng': 117.143698,
        'lat': 36.67025,
        'count': 31
      },
      {
        'lng': 117.144974,
        'lat': 36.670684,
        'count': 31
      },
      {
        'lng': 117.125425,
        'lat': 36.697456,
        'count': 240
      },
      {
        'lng': 117.03074,
        'lat': 36.672987,
        'count': 77
      },
      {
        'lng': 116.824579,
        'lat': 36.562618,
        'count': 65
      },
      {
        'lng': 116.752428,
        'lat': 36.55536,
        'count': 117
      },
      {
        'lng': 116.756929,
        'lat': 36.557375,
        'count': 150
      },
      {
        'lng': 116.763574,
        'lat': 36.561682,
        'count': 405
      },
      {
        'lng': 116.754882,
        'lat': 36.566336,
        'count': 178
      },
      {
        'lng': 116.772118,
        'lat': 36.558125,
        'count': 282
      },
      {
        'lng': 116.76592,
        'lat': 36.562213,
        'count': 126
      },
      {
        'lng': 116.75395,
        'lat': 36.56158,
        'count': 215
      }
    ];

  }

  conversionData(data) {

    let regionData = data.map(function (item) {
      return item['path'];
    });
    return regionData;

  }

  getPlaceByID(id: string): Promise<any> {

    let places = [
      {
        'id': '001',
        'path': [117.017446, 28.210569],
        'state': 0,
        'carNo': '',
        'carType': '0',
        'parkInTime': '',
      },
      {
        'id': '002',
        'path': [117.017293, 28.210552],
        'state': 1,
        'carNo': '鲁A12345',
        'carType': '1',
        'parkInTime': '2016-06-10 9:00'
      },
      {
        'id': '003',
        'path': [117.017243, 28.210542],
        'state': 1,
        'carNo': '鲁A13335',
        'carType': '1',
        'parkInTime': '2016-06-10 9:00',
      },
      {
        'id': '004',
        'path': [117.01729, 28.210592],
        'state': 0,
        'carNo': '',
        'carType': '',
        'parkInTime': ''
      },
      {
        'id': '005',
        'path': [117.017564, 28.210578],
        'state': 1,
        'carNo': '鲁A12345',
        'parkInTime': '2016-06-10 9:00'
      },
      {
        'id': '006',
        'path': [117.017243, 28.210542],
        'state': 1,
        'carNo': '鲁A12345',
        'parkInTime': '2016-06-10 9:00'
      },
      {
        'id': '007',
        'path': [117.017682, 28.210592],
        'state': 0,
        'carNo': '',
        'carType': '0',
        'parkInTime': '',
      },
      {
        'id': '008',
        'path': [117.017243, 28.210542],
        'state': 0,
        'carNo': '',
        'carType': '0',
        'parkInTime': '',
      },
      {
        'id': '009',
        'path': [117.017435, 28.210682],
        'state': 1,
        'carNo': '鲁A12345',
        'carType': '1',
        'parkInTime': '2016-06-10 9:00'
      },
      {
        'id': '010',
        'path': [117.017178, 28.210601],
        'state': 1,
        'carNo': '鲁A12345',
        'carType': '1',
        'parkInTime': '2016-06-10 9:00'
      },
      {
        'id': '011',
        'path': [117.017854, 28.210601],
        'state': 1,
        'carNo': '鲁A12345',
        'carType': '1',
        'parkInTime': '2016-06-10 9:00'
      },
      {
        'id': '012',
        'path': [117.017424, 28.210636],
        'state': 2,
        'carType': '',
        'carNo': '',
        'parkInTime': ''
      },
      {
        'id': '013',
        'path': [117.01765, 28.210597],
        'state': 1,
        'carNo': '鲁A12345',
        'carType': '0',
        'parkInTime': '2016-06-10 9:00'
      }
    ];
    return new Promise((resolve, reject) => {
      resolve(places);
    }).then(res => <Place[]> res)
      .then(data => {
        let a = [];


        return data.map((item) => {
          return {'lng': item.path[0], 'lat': item.path[1], 'count': 1};
        });
      });
  }

  getParkByID(id: string): Promise<any> {
    let marks = [
      {
        'id': '001',
        'no': '001',
        'name': '道路车场1',
        'overlayerId': 'roadParkOverlay',
        'path': [[117.017139, 28.210742], [117.017048, 28.210421], [117.017337, 28.210497], [117.017938, 28.210459],
          [117.017911, 28.210681]],
        'lng': 117.017139,
        'lat': 28.210742,
        'chargeName': '收费标准1',
        'desc': 'XX路XX米XX路西',
        'departmentName': '历下分公司',
        'placeCount': 40,
        'placeNoUsedCount': 33,
        'status': '正常',
        'operateBeginTime': '2016-08-07',
        'operateEndTime': '2016-12-12',
        'createTime': '2016-12-12'

      }
    ];
    return new Promise((resolve, reject) => {
      resolve(marks);
    }).then(res => <Park[]> res)
      .then(data => {
        return data;
      });
  }

  getTolls(): Promise<any> {
    let marks = [
      {
        'lng': 117.046322,
        'lat': 36.672221,
        'name': '张三',
        'id': '0001',
        'no': '0001',
        'departmentName': '历下小组2',
        'time': '2017-02-22 11:20',
        'tel': '110',
        'overlayerId': 'tollOverlay',
      },
      {
        'lng': 117.033205,
        'lat': 36.664715,
        'name': '王五',
        'id': '0002',
        'no': '0002',
        'departmentName': '历下小组1',
        'time': '2017-02-22 11:20',
        'tel': '110',
        'overlayerId': 'tollOverlay',
      },
      {
        'lng': 117.046316,
        'lat': 36.677939,
        'name': '李四',
        'id': '0003',
        'no': '0003',
        'departmentName': '历下小组1',
        'time': '2017-02-22 11:20',
        'tel': '110',
        'overlayerId': 'tollOverlay',

      },
      {
        'lng': 117.023131,
        'lat': 36.664349,
        'name': '赵六',
        'id': '0004',
        'no': '0004',
        'departmentName': '历下小组1',
        'time': '2017-02-22 11:20',
        'tel': '110',
        'overlayerId': 'tollOverlay',
      },
      {
        'lng': 117.022943,
        'lat': 36.670193,
        'name': '刘东',
        'id': '0005',
        'no': '0005',
        'departmentName': '历下小组1',
        'time': '2017-02-22 11:20',
        'tel': '110',
        'overlayerId': 'tollOverlay',
      }
    ];
    return new Promise((resolve, reject) => {
      resolve(marks);
    }).then(res => <Toll[]> res)
      .then(data => {
        return data;
      });
  }

  getRegions(): Promise<any> {
    return this.http.get('/test/data/park-monitor-region.json')
      .toPromise()
      .then(res => <Region[]> res.json().data)
      .then(data => {
        return data;
      });
  }

  getDemonstrationRoadOverlayData() {
    let polylines = [
      {
        'id': '001',
        'name': '解放东路',
        'department': '历下区',
        'placeCount': '12',
        'parkCount': '123',
        'parkLocation': '双侧',
        'parkTime': '08：00-12：00',
        'overlayerId': 'demonstrationRoadOverlay',
        'path': [[117.101099, 36.663251], [117.119725, 36.663113]]
      },
      {
        'id': '002',
        'name': '经十路',
        'department': '历下区',
        'placeCount': '33',
        'parkCount': '1',
        'parkLocation': '双侧',
        'parkTime': '08：00-12：00',
        'overlayerId': 'demonstrationRoadOverlay',
        'path': [[117.085478, 36.652027], [117.083161, 36.639012]]
      },
      {
        'id': '003',
        'name': '窑头路',
        'department': '历下区',
        'placeCount': '56',
        'parkCount': '3',
        'parkLocation': '双侧',
        'parkTime': '11：00-12：00',
        'overlayerId': 'demonstrationRoadOverlay',
        'path': [[117.11338, 36.654215], [117.141447, 36.654215], [117.146167, 36.656005]]
      }];
    return new Promise((resolve, reject) => {
      resolve(polylines);
    }).then(res => <Road[]> res)
      .then(data => {
        return data;
      });
  }

  getElseRoadOverlayData() {
    let polylines = [
      {
        'id': '001',
        'name': '工业南路车场',
        'overlayerId': 'elseRoadOverlay',
        'department': '历城区',
        'placeCount': '12',
        'parkCount': '123',
        'parkLocation': '双侧',
        'parkTime': '08：00-12：00',
        'path': [[117.079642, 36.665592], [117.09964, 36.663182]]
      },
      {
        'id': '002',
        'name': '七里河路车场',
        'department': '历城区',
        'placeCount': '12',
        'parkCount': '123',
        'parkLocation': '双侧',
        'parkTime': '08：00-12：00',
        'overlayerId': 'elseRoadOverlay',
        'path': [[{
          'O': 36.67638611081728,
          'M': 117.13221510664408,
          'lng': 117.132215,
          'lat': 36.676386
        }, {
          'O': 36.67583540412423,
          'M': 117.13255842939793,
          'lng': 117.132558,
          'lat': 36.675835
        }, {
          'O': 36.673219493499865,
          'M': 117.12655028120463,
          'lng': 117.12655,
          'lat': 36.673219
        }, {
          'O': 36.673219493499865,
          'M': 117.12620695845072,
          'lng': 117.126207,
          'lat': 36.673219
        }, {
          'O': 36.67142960867024,
          'M': 117.11659392134135,
          'lng': 117.116594,
          'lat': 36.67143
        }, {
          'O': 36.671567293596844,
          'M': 117.1169372440952,
          'lng': 117.116937,
          'lat': 36.671567
        }, {'O': 36.671842662711, 'M': 117.11710890547221, 'lng': 117.117109, 'lat': 36.671843}]]

      },
      {
        'id': '023',
        'name': '姚家庄东路车场',
        'department': '历城区',
        'placeCount': '12',
        'parkCount': '123',
        'parkLocation': '双侧',
        'parkTime': '08：00-12：00',
        'overlayerId': 'elseRoadOverlay',
        'path': [[{
          'O': 36.660052540518286,
          'M': 117.09832667156968,
          'lng': 117.098327,
          'lat': 36.660053
        }, {
          'O': 36.65996647459247,
          'M': 117.0976829414061,
          'lng': 117.097683,
          'lat': 36.659966
        }, {
          'O': 36.65962220992703,
          'M': 117.09772585675034,
          'lng': 117.097726,
          'lat': 36.659622
        }, {'O': 36.65989762178255, 'M': 117.09856270596299, 'lng': 117.098563, 'lat': 36.659898}]
          , [{
            'O': 36.66202048596253,
            'M': 117.09901863461528,
            'lng': 117.099019,
            'lat': 36.66202
          }, {
            'O': 36.65818195024625,
            'M': 117.09871822720561,
            'lng': 117.098718,
            'lat': 36.658182
          }, {
            'O': 36.65814752305093,
            'M': 117.09895426159892,
            'lng': 117.098954,
            'lat': 36.658148
          }, {'O': 36.66191720948032, 'M': 117.09925466900859, 'lng': 117.099255, 'lat': 36.661917}]
        ]
      }];
    return new Promise((resolve, reject) => {
      resolve(polylines);
    }).then(res => <Road[]> res)
      .then(data => {
        return data;
      });
  }

  geRoadParkOverlayData() {
    let polygons = [
      {
        'id': '001',
        'name': '道路车场1',
        'overlayerId': 'roadParkOverlay',
        'path': [[117.079642, 36.665592], [117.09964, 36.663182]],
        'lng': 117.665592,
        'lat': 36.663182,
        'chargeName': '收费标准1',
        'desc': 'XX路XX米XX路西',
        'departmentName': '历下分公司',
        'placeCount': 40,
        'placeNoUsedCount': 33
      }, {
        'id': '0011',
        'name': '道路车场2',
        'overlayerId': 'roadParkOverlay',
        'path': [[117.227982, 36.672622], [117.227869, 36.672467], [117.228776, 36.672115]],
        'lng': 117.227982,
        'lat': 36.672622,
        'chargeName': '收费标准1',
        'desc': 'XX路XX米XX路西',
        'departmentName': '历下分公司',
        'placeCount': 30,
        'placeNoUsedCount': 2
      },
      {
        'id': '0021',
        'name': '道路车场3',
        'overlayerId': 'roadParkOverlay',
        'path': [[117.12849, 36.644873], [117.127446, 36.644434], [117.127928, 36.64396],
          [117.128905, 36.644408], [117.128358, 36.644554], [117.128315, 36.64470]],
        'lng': 117.12849,
        'lat': 36.644873,
        'chargeName': '收费标准1',
        'desc': 'XX路XX米XX路西',
        'departmentName': '历下分公司',
        'placeCount': 40,
        'placeNoUsedCount': 40

      }];
    return new Promise((resolve, reject) => {
      resolve(polygons);
    }).then(res => <Park[]> res)
      .then(data => {
        return data;
      });
  }

  gePublicParkOverlayData() {
    let polygons = [
      {
        'id': '0201',
        'name': '封闭车场1',
        'overlayerId': 'publicParkOverlay',
        'path': [[117.079642, 36.665592], [117.09964, 36.663182]],
        'lng': 117.09964,
        'lat': 36.663182,
        'chargeName': '收费标准1',
        'desc': '新泺大街东300米',
        'departmentName': '高新区分公司',
        'placeCount': 30,
        'placeNoUsedCount': 8
      }, {
        'id': '0301',
        'name': '封闭车场2',
        'overlayerId': 'publicParkOverlay',
        'path': [[117.128706, 36.672683], [117.128411, 36.672519], [117.1295, 36.671968],
          [117.12957, 36.672162], [117.129066, 36.67236]],
        'lng': 117.128706,
        'lat': 36.672683,
        'chargeName': '收费标准2',
        'desc': '新泺大街东300米',
        'departmentName': '高新区分公司',
        'placeCount': 20,
        'placeNoUsedCount': 15

      },
      {
        'id': '0401',
        'name': '封闭车场3',
        'overlayerId': 'publicParkOverlay',
        'path': [[117.12839, 36.674873], [117.127446, 36.674434], [117.127928, 36.67396],
          [117.128905, 36.674408], [117.128358, 36.674554], [117.128315, 36.67470]],
        'lng': 117.12839,
        'lat': 36.674873,
        'chargeName': '收费标准3',
        'desc': '新泺大街东1300米',
        'departmentName': '高新区分公司',
        'placeCount': 10,
        'placeNoUsedCount': 12
      }];

    return new Promise((resolve, reject) => {
      resolve(polygons);
    }).then(res => <Park[]> res)
      .then(data => {
        return data;
      });
  }

  getCommunityParkOverlayData() {
    let polygons = [
      {
        'id': '0013',
        'name': '社区车场1',
        'overlayerId': 'communityParkOverlay',
        'path': [[117.079642, 36.665592], [117.09964, 36.663182]],
        'lng': 117.079642,
        'lat': 36.665592,
        'chargeName': '收费标准1',
        'desc': 'XX路XX米XX路西',
        'departmentName': '历下分公司',
        'placeCount': 30,
        'placeNoUsedCount': 3
      }, {
        'id': '3001',
        'name': '社区车场2',
        'overlayerId': 'communityParkOverlay',
        'path': [[117.125413, 36.672892], [117.125692, 36.67155],
          [117.12567, 36.672875], [117.125542, 36.672875]],
        'lng': 117.12567,
        'lat': 36.672875,
        'chargeName': '收费标准1',
        'desc': 'XX路XX米XX路西',
        'departmentName': '历下分公司',
        'placeCount': 30,
        'placeNoUsedCount': 15
      },
      {
        'id': '001',
        'name': '社区车场3',
        'overlayerId': 'communityParkOverlay',
        'path': [[117.126507, 36.67198], [117.126121, 36.671911],
          [117.126421, 36.671188], [117.126915, 36.67136]],
        'lng': 117.126421,
        'lat': 36.671188,
        'chargeName': '收费标准1',
        'desc': 'XX路XX米XX路西',
        'departmentName': '历下分公司',
        'placeCount': 30,
        'placeNoUsedCount': 20

      }];
    return new Promise((resolve, reject) => {
      resolve(polygons);
    }).then(res => <Park[]> res)
      .then(data => {
        return data;
      });
  }

  getPlacesByPark() {
    let places = [
      {
        'id': '001',
        'path': [[117.079642, 36.665592], [117.09964, 36.663182]],
        'state': 0,
        'carNo': '',
        'carType': '0',
        'parkInTime': '',
      },
      {
        'id': '002',
        'path': [[117.079642, 36.665592], [117.09964, 36.663182]],
        'state': 1,
        'carNo': '鲁A12345',
        'carType': '1',
        'parkInTime': '2016-06-10 9:00'
      },
      {
        'id': '003',
        'path': [[117.079642, 36.665592], [117.09964, 36.663182]],
        'state': 1,
        'carNo': '鲁A13335',
        'carType': '1',
        'parkInTime': '2016-06-10 9:00',
      },
      {
        'id': '004',
        'path': [[117.079642, 36.665592], [117.09964, 36.663182]],
        'state': 0,
        'carNo': '',
        'carType': '',
        'parkInTime': ''
      },
      {
        'id': '005',
        'path': [[117.079642, 36.665592], [117.09964, 36.663182]],
        'state': 1,
        'carNo': '鲁A12345',
        'parkInTime': '2016-06-10 9:00'
      },
      {
        'id': '006',
        'path': [[117.079642, 36.665592], [117.09964, 36.663182]],
        'state': 1,
        'carNo': '鲁A12345',
        'parkInTime': '2016-06-10 9:00'
      },
      {
        'id': '007',
        'path': [[117.079642, 36.665592], [117.09964, 36.663182]],
        'state': 0,
        'carNo': '',
        'carType': '0',
        'parkInTime': '',
      },
      {
        'id': '008',
        'path': [[117.079642, 36.665592], [117.09964, 36.663182]],
        'state': 0,
        'carNo': '',
        'carType': '0',
        'parkInTime': '',
      },
      {
        'id': '009',
        'path': [[117.079642, 36.665592], [117.09964, 36.663182]],
        'state': 1,
        'carNo': '鲁A12345',
        'carType': '1',
        'parkInTime': '2016-06-10 9:00'
      },
      {
        'id': '010',
        'path': [[117.079642, 36.665592], [117.09964, 36.663182]],
        'state': 1,
        'carNo': '鲁A12345',
        'carType': '1',
        'parkInTime': '2016-06-10 9:00'
      },
      {
        'id': '011',
        'path': [[117.079642, 36.665592], [117.09964, 36.663182]],
        'state': 1,
        'carNo': '鲁A12345',
        'carType': '1',
        'parkInTime': '2016-06-10 9:00'
      },
      {
        'id': '012',
        'path': [[117.079642, 36.665592], [117.09964, 36.663182]],
        'state': 2,
        'carType': '',
        'carNo': '',
        'parkInTime': ''
      },
      {
        'id': '013',
        'path': [[117.079642, 36.665592], [117.09964, 36.663182]],
        'state': 1,
        'carNo': '鲁A12345',
        'carType': '0',
        'parkInTime': '2016-06-10 9:00'
      }
    ];
    return new Promise((resolve, reject) => {
      resolve(places);
    }).then(res => <Park[]> res)
      .then(data => {
        return data;
      });
  }

}
